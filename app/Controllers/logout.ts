
import {Router} from 'express';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import { AuthenticationError } from '../errorHandler.js';

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    tls: false,
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});
await client.connect();


export function logout() {
    const router = Router();

    router.post('/', async(req, res) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AuthenticationError('No authorization token provided');
        }
        const decoded = jwt.decode(token);
        if (!decoded || typeof decoded !== 'object' || !decoded.jti || !decoded.exp) {
            throw new AuthenticationError('Invalid token');
        }
        const nowInSec = Math.floor(Date.now() / 1000);
        const ttl = decoded.exp - nowInSec;

        await client.setEx(decoded.jti, ttl, 'blacklisted');
        console.log(`user with email ${decoded.email} has logged out`);
        return res.status(200).json({message: 'Logout completed successfully'})
    });

    return router;
}

export async function isTokenBlacklisted(token : string) {
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded !== 'object' || !('jti' in decoded)) {
        throw new AuthenticationError('Invalid token');
    }
    
    const jti = (decoded as { jti: string }).jti;
    const result = await client.exists(jti);
    return result === 1;
}