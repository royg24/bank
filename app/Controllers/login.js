import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { validateUser, responseFromDB } from '../database.js';
import { validateLogin } from '../Validator/validations.js';
import { hashPassword } from '../utils/utils.js';

export default function login() {
    const router = Router();

    router.post('/', async (req, res) => {
        const body = req.body;
        const errorMessage = validateLogin(body);
        const jti = randomUUID();

        if (errorMessage) {
            return res.status(400).json({ error: errorMessage });
        }
    
        const queryResult = await validateUser(body.email, hashPassword(body.password));

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