import {Router} from 'express';
import { getUserBalance, responseFromDB } from '../database.js';
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from './logout.js'

export default function getBalance() {
    const router = Router();

    router.get('/', async (req, res) => {
        const token = req.headers.authorization;
        let id = undefined;

        if (!token || await isTokenBlacklisted(token)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
        id = jwt.verify(token, process.env.JWT_KEY).id;
        } catch (error) {
            return res.status(401).json({ error: 'Please log in' });
        }

        const queryResult = await getUserBalance(id);
        return responseFromDB(res, 200, queryResult, {balance: queryResult.balance});
    });

    return router;
}