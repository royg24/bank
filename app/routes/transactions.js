import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { getUserTransactions, responseFromDB } from '../database.js';
import { isTokenBlacklisted } from './logout.js';

export default function getTransactions() {
    const router = Router();

    router.get('/', async (req, res) => {
        const token = req.headers.authorization;
        let id = undefined;

        if (!token || await isTokenBlacklisted(token)) {
            return res.status(401).json({ error: 'Please log in' });
        }
        try {
            id = jwt.verify(token, process.env.JWT_KEY).id;
        } catch (error) {
            return res.status(401).json({ error: 'Please log in' });
        }

        const index = Number(req.query.index)

        const queryResult = await getUserTransactions(id, index);
        return responseFromDB(res, 200, queryResult, {
            transactions: queryResult.transactions,
            totalPages: queryResult.totalPages
        });
    });

    return router;
}