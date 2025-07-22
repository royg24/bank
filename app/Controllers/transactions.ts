import {Router} from 'express';
import { getUserTransactions, addTransaction, responseFromDB, isUserVerified } from '../database.js';
import { isTokenBlacklisted } from './logout.js';
import { validateTransfer } from '../Validator/validations.js';
import { ValidationError, AuthenticationError } from '../errorHandler.js';
import { verifyToken } from '../utils/utils.js';

export function makeTransaction() {
    const router = Router();

    router.post('/', async (req, res) => {
        const body = req.body;
        const token = req.headers.authorization;

        const errorMessage = validateTransfer(body);
        if (errorMessage) {
            throw new ValidationError(errorMessage);
        }
        if (!token || await isTokenBlacklisted(token)) {
            throw new AuthenticationError('Please log in');
        }
        
        const id = await verifyToken(token);

        const queryResult = await addTransaction(id, Number(body.amount), body.receiverEmail);
        return res.status(200).json({
            message: queryResult.message,
            updatedBalance: queryResult.updatedBalance
        });
    });

    return router;
}

export function getTransactions() {
    const router = Router();

    router.get('/', async (req, res) => {
        const token = req.headers.authorization;
        const id = await verifyToken(token);
        const index = Number(req.query.index)

        const queryResult = await getUserTransactions(id, index);
        return res.status(200).json({
            transactions: queryResult.transactions,
            totalPages: queryResult.totalPages
        });
    });

    return router;
}