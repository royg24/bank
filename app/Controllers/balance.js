import {Router} from 'express';
import { getUserBalance, responseFromDB } from '../database.js';
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
        id = jwt.verify(token, process.env.JWT_KEY).id;
        } catch (error) {
            throw new AuthenticationError('Please log in');
        }

        const queryResult = await getUserBalance(id);
        return responseFromDB(res, 200, queryResult, {balance: queryResult.balance});
    });

    return router;
}