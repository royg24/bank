import {Router} from 'express';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { validateUser, responseFromDB } from '../database.js';
import { validateLogin } from '../Validator/validations.js';
import { hashPassword } from '../utils/utils.js';
import { ValidationError } from '../errorHandler.js';

export default function login() {
    const router = Router();

    router.post('/', async (req, res) => {
        const body = req.body;
        const data = body.data;
        const jti = randomUUID();

        if (body.type === 'form') {
            const errorMessage = validateLogin(data);
            if (errorMessage) {
                throw new ValidationError(errorMessage);
            }
        }
    
        const hashedPassword = data.password ? hashPassword(data.password) : undefined;
        const queryResult = await validateUser(data.email, body.type, hashedPassword);

        if (!process.env.JWT_KEY) {
            throw new Error('JWT_KEY environment variable is not defined');
        }
        const token = jwt.sign({ 
            email: data.email,
            id: queryResult.id,
            jti: jti
        }, process.env.JWT_KEY as string, { expiresIn: '24h' });

        console.log(`user with email ${data.email} has logged in`);
        return responseFromDB(res, 200, {
            message: queryResult.message,
            accessToken: token
        });
    });

    return router;
}