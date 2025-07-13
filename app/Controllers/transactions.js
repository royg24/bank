import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { getUserTransactions, addTransaction, responseFromDB } from '../database.js';
import { isTokenBlacklisted } from './logout.js';
import { validateTransfer } from '../Validator/validations.js';
import { ValidationError, AuthenticationError } from '../errorHandler.js';

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
        
        let id = undefined;
        try {
            id = jwt.verify(token, process.env.JWT_KEY).id;
        } catch (error) {
            throw new AuthenticationError('Please log in');
        }

        const queryResult = await addTransaction(id, body.amount, body.receiverEmail);
        return responseFromDB(res, 200, queryResult, {
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
        let id = undefined;

        if (!token || await isTokenBlacklisted(token)) {
            throw new AuthenticationError('Please log in');
        }
        try {
            id = jwt.verify(token, process.env.JWT_KEY).id;
        } catch (error) {
            throw new AuthenticationError('Please log in');
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