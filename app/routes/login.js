import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { validateUser, responseFromDB } from '../database.js';
import * as utils from '../utils.js';

export default function login() {
    const router = Router();

    router.post('/', async (req, res) => {
        const body = req.body;
        const errorMessage = validate(body);
        const jti = randomUUID();

        if (errorMessage) {
            return res.status(400).json({ error: errorMessage });
        }
    
        const queryResult = await validateUser(body.email, utils.hashPassword(body.password));

        const token = jwt.sign({ 
            email: body.email,
            id: queryResult.id,
            jti: jti
        }, process.env.JWT_KEY, { expiresIn: '24h' });

        console.log(`user with email ${body.email} has logged in`);
        return responseFromDB(res, 200, queryResult, {
            message: queryResult.message,
            accessToken: token
        });
    });

    return router;
}

function validate(body) {
    const requiredFieldsError = checkRequiredFields(body);
        if (requiredFieldsError) {
            return requiredFieldsError;
        }
    
        const emailError = utils.validateEmail(body.email);
        if (emailError) {
            return emailError;
        }
    
        const passwordError = utils.validatePassword(body.password);
        if (passwordError) {
            return passwordError;
        }
    
        return null;
}

function checkRequiredFields(body) {
    const isEmailEmpty = utils.checkRequiredFiled('email', body.email);
    if (isEmailEmpty) {
        return isEmailEmpty
    }

    const isPasswordEmpty = utils.checkRequiredFiled('password', body.password);
    if (isPasswordEmpty) {
        return isPasswordEmpty
    }

    return null;
}