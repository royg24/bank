import {Router} from 'express';
import { randomUUID } from 'crypto';
import { addUser, responseFromDB, deleteUser } from '../database.js';
import { validateSignUp } from '../Validator/validations.js';
import { hashPassword, normalizeEmail } from '../utils/utils.js';
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

        const email = normalizeEmail(data.email);
        const hashedPassword = data.password ? hashPassword(data.password) : undefined;
        const phoneNumber = data.phoneNumber ?? undefined;

        const queryResult = await addUser(randomUUID(), email, body.type, 
        hashedPassword, phoneNumber);

        setTimeout(async () => {
            await deleteUser(data.email);
        }, 180000);

        console.log(`user with email ${data.email} has signed up but not yet verified`)
        return res.status(201).json({message: queryResult.message});

    });

    return router;
};

