
import {Router} from 'express';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import { AuthenticationError } from '../errorHandler.js';

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: 6379
  }
});

await client.connect();

export function logout() {
    const router = Router();

    router.post('/', async(req, res) => {
        const decoded = jwt.decode(req.headers.authorization);
        const nowInSec = Math.floor(Date.now() / 1000);
        const ttl = decoded.exp - nowInSec;

        if (!decoded || !decoded.jti || !decoded.exp) {
            throw new AuthenticationError('Invalid token');
        }

        await client.setEx(decoded.jti, ttl, 'blacklisted');
        console.log(`user with email ${decoded.email} has logged out`);
        return res.status(200).json({message: 'Logout completed successfully'})
    });

    return router;
}

export async function isTokenBlacklisted(token) {
    const jti = jwt.decode(token).jti;
    const result = await client.exists(jti);
    return result === 1;
}