import {Router} from 'express';
import { randomUUID } from 'crypto';
import { addUser, responseFromDB } from '../database.js';
import { validateSignUp } from '../Validator/validations.js';
import { hashPassword } from '../utils/utils.js';
import { ValidationError } from '../errorHandler.js';

export default function signUp() {
    const router = Router();

    router.post('/', async (req, res) => {
        const body = req.body;
        const data = body.data;

        if (body.type === 'form') {
            const erroerMessage = validateSignUp(data);
            if (erroerMessage) {
                throw new ValidationError(erroerMessage)
            }
        }

        const hashedPassword = data.password ? hashPassword(data.password) : undefined;
        const phoneNumber = data.phoneNumber ?? undefined;

        const queryResult = await addUser(randomUUID(), data.email, body.type, 
        hashedPassword, phoneNumber);

        console.log(`user with email ${body.email} has signed up but not yet verified`)
        return responseFromDB(res, 201, {message: queryResult.message});

    });

    return router;
};

