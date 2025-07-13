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

        const erroerMessage = validateSignUp(body, res);
        if (erroerMessage) {
            throw new ValidationError(erroerMessage)
        }
        

        //TODO add SMS code verification
        // if invalid returns error code 401

        const queryResult = await addUser(randomUUID(), body.email, hashPassword(body.password)
        , body.phoneNumber, 1000000, true);

        console.log(`user with email ${body.email} has signed up`)
        return responseFromDB(res, 201, queryResult, {message: queryResult.message});

    });

    return router;
};

