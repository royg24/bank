import {Router} from 'express';
import { getUserBalance, responseFromDB, isUserVerified } from '../database.js';
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from './logout.js';
import { AuthenticationError } from '../errorHandler.js';
import { verifyToken } from '../utils/utils.js';

export default function getBalance() {
    const router = Router();

    router.get('/', async (req, res) => {
        const token = req.headers.authorization;
        const id = await verifyToken(token);

        const queryResult = await getUserBalance(id);
        return res.status(200).json({balance: queryResult.balance});
    });

    return router;
}