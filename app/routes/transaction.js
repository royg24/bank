import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { addTransaction, responseFromDB } from '../database.js';
import * as utils from '../utils.js';
import { isTokenBlacklisted } from './logout.js';

export default function makeTransaction() {
    const router = Router();

    router.post('/', async (req, res) => {
        const body = req.body;
        const token = req.headers.authorization;

        const errorMessage = validate(body);
        if (errorMessage) {
            return res.status(400).json({ error: errorMessage });
        }
        if (!token || await isTokenBlacklisted(token)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        let id = undefined;
        try {
            id = jwt.verify(token, process.env.JWT_KEY).id;
        } catch (error) {
            return res.status(401).json({ error: 'Please log in' });
        }

        const queryResult = await addTransaction(id, body.amount, body.receiverEmail);
        return responseFromDB(res, 200, queryResult, {
            message: queryResult.message,
            updatedBalance: queryResult.updatedBalance
        });
    });

    return router;
}

function validate(body) {
    const requiredFieldsError = checkRequiredFields(body);
    if (requiredFieldsError) {
        return requiredFieldsError;
    }

    const receiverError = utils.validateEmail(body.receiverEmail);
    if (receiverError) {
        return receiverError;
    }

    const amountError = utils.validateAmount(body.amount);
    if (amountError) {
        return amountError;
    }

    return null;
}

function checkRequiredFields(body) {

    const isReceiverEmpty = utils.checkRequiredFiled('receiver email', body.receiverEmail);
    if (isReceiverEmpty) {
        return isReceiverEmpty;
    }

    const isAmountEmpty = utils.checkRequiredFiled('amount', body.amount);
    if (isAmountEmpty) {
        return isAmountEmpty;
    }

    return null;
}