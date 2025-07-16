import {Router} from 'express';
import { getUserBalance, responseFromDB, isUserVerified } from '../database.js';
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from './logout.js';
import { AuthenticationError } from '../errorHandler.js';

export default function getBalance() {
    const router = Router();

    router.get('/', async (req, res) => {
        const token = req.headers.authorization;
        let id = undefined;

        if (!token || await isTokenBlacklisted(token)) {
            throw new AuthenticationError('Unauthorized');
        }
        try {
        if (!process.env.JWT_KEY) {
            throw new AuthenticationError('Server misconfiguration: JWT_KEY missing');
        }
        id = (jwt.verify(token, process.env.JWT_KEY) as { id: string }).id;

        if (!isUserVerified(id)) {
            throw new AuthenticationError('User not verified');
        }
        } catch (error) {
            throw new AuthenticationError('Please log in');
        }

        const queryResult = await getUserBalance(id);
        return responseFromDB(res, 200, {balance: queryResult.balance});
    });

    return router;
}