import {Router} from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { client } from '../redis.js';
import { NotFoundError } from '../errorHandler.js';
import { validateSend } from '../Validator/validations.js'
import { normalizeEmail } from '../utils/utils.js';

dotenv.config();
const resend = new Resend(process.env.RESEND_APP_KEY);

export default function sendCode() {
    const router = Router();

    router.post('/', async (req, res, next) => {
        try {
            const email = normalizeEmail(req.body.email);
            const code = Math.floor(100000 + Math.random() * 900000).toString();

            const errorMessage = validateSend(email);
            if (errorMessage) {
                throw new NotFoundError(errorMessage);
            }
            
            const payload = {
                sender: {
                    name: 'Gold Bank',
                    email: 'roy@goldhar.net',
                },
                to: [{ email }],
                subject: 'GoldBank verification code',
                htmlContent: `<p>Welcome to GoldBank!<br>Your verification code is <strong>${code}</strong>.</p>`,
            };

            const response = await axios.post('https://api.brevo.com/v3/smtp/email', payload, {
                headers: {
                    'api-key': process.env.BREVO_API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status >= 200 && response.status < 300) {
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