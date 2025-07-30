import {Router} from 'express';
import dotenv from 'dotenv';
import { client} from '../redis.js';
import { validateValidate } from '../Validator/validations.js';
import { ValidationError, AuthenticationError } from '../errorHandler.js';
import { approveUser } from '../database.js';

dotenv.config();


export default function validateCode() {
    const router = Router();

    router.post('/', async (req, res, next) => {
        const body = req.body;
        const errorMessage = validateValidate(body);

        if(errorMessage) {
            throw new ValidationError(errorMessage);
        }

        try {
            const actuallCode = await client.get(body.email);
            if (actuallCode === body.code.toString()) {
                console.log(`User with email ${body.email} has been approved`);
                approveUser(body.email);
                return res.status(200).json({message: 'Sign up was successful'});
            } else {
                throw new AuthenticationError('Incorrect code, You can try sign up' + 
                    ' again with the same email after 1 minutes'
                );
            }

        } catch(error) {
            return next(error);
        }
    });

    return router;
}