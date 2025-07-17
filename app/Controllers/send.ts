import {Router} from 'express';
//import twilio from 'twilio';
import dotenv from 'dotenv';
//import { setNumberFormat } from '../utils/utils.js';
//import { validateSend } from '../Validator/validations.js';
//import { ValidationError } from '../errorHandler.js';
//import { getPhoneNumber } from '../database.js';

dotenv.config();
//const client = twilio(process.env.TWILIO_ID, process.env.TWILIO_TOKEN);
//const verifySID = process.env.TWILIO_VERIFY || '';

export default function sendCode() {
    const router = Router();

    router.post('/', async (req, res, next) => {
        /*const body = req.body;
        const errorMessage = validateSend(body.phoneNumber);
        console.log(setNumberFormat(body.phoneNumber));
        if(errorMessage) {
            throw new ValidationError(errorMessage);
        }

        try {
            await client.verify.v2.services(verifySID).verifications
            .create({
                to: setNumberFormat(body.phoneNumber),
                channel: 'sms'
            });

            return res.status(200).json({message: 'Code sent'});
        } catch(error) {
            return next(error);
        }*/
    });

    return router;
}