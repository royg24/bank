import {Router} from 'express';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { client } from '../redis.js';
import { NotFoundError } from '../errorHandler.js';
import { validateSend } from '../Validator/validations.js'

dotenv.config();
const resend = new Resend(process.env.RESEND_APP_KEY);

export default function sendCode() {
    const router = Router();

    router.post('/', async (req, res, next) => {
        try {
            const email = req.body.email;
            const code = Math.floor(100000 + Math.random() * 900000).toString();

            const errorMessage = validateSend(email);
            if (errorMessage) {
                throw new NotFoundError(errorMessage);
            }
            
            resend.emails.send({
                from: process.env.RESEND_SENDER_MAIL,
                to: email,
                subject: 'GoldBank verification code',
                html: `<p>Welcome to GoldBank!<br> Your verification code is ${code}</p>`
            });

            if (resend) {
                await client.setEx(email, 185, code);

                console.log(`Verification code sent to ${email}`);
                res.status(200).json({ message: 'Code sent successfully' });;
            } else {
                throw new Error('Failed to send verification code');
            }
        } catch(error) {
            return next(error);
        }
    });

    return router;
}