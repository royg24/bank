import {Router} from 'express';
//import twilio from 'twilio';
import dotenv from 'dotenv';
//import { setNumberFormat } from '../utils/utils.js'
//import { validateValidate } from '../Validator/validations.js';
//import { ValidationError, AuthenticationError } from '../errorHandler.js';
//import { approveUser, getPhoneNumber } from '../database.js';

dotenv.config();
//const client = twilio(process.env.TWILIO_ID, process.env.TWILIO_TOKEN);
//const verifySID = process.env.TWILIO_VERIFY || '';

export default function validateCode() {
    const router = Router();

    router.post('/', async (req, res, next) => {
        /*const body = req.body;
        const errorMessage = validateValidate(body);

        if(errorMessage) {
            throw new ValidationError(errorMessage);
        }

        try {
            const phoneNumber = await getPhoneNumber(body.email);
            const check = await client.verify.v2.services(verifySID).verificationChecks
            .create({
                to: setNumberFormat(phoneNumber),
                code: String(body.code)
            });

            if (check.status === 'approved') {
                await approveUser(body.email);
                return res.status(200).json({message: 'Correct code'});
            } else {
                throw new AuthenticationError('Incorrect code');
            }
        } catch(error) {
            return next(error);
        }*/
    });

    return router;
}