import {Router} from 'express';
import dotenv from 'dotenv';
import { client } from '../redis.js';
import nodemailer from 'nodemailer';
import { NotFoundError } from '../errorHandler.js';
import { validateSend } from '../Validator/validations.js'
import { normalizeEmail } from '../utils/utils.js';

dotenv.config();

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

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'noreply.goldbank@gmail.com',
                    pass: process.env.GMAIL_APP_PASSWORD
                }, 
                tls: {
                        rejectUnauthorized: false
                    }
            });

            const mailOptions = {
                from: "Gold Bank",
                to: email,
                subject: 'Your Verification Code',
                text: `Your verification code is: ${code}`,
                html: `<p>Your verification code is: <b>${code}</b></p>` 
            };

            try {
                await transporter.sendMail(mailOptions);
                await client.setEx(email, 65, code);

                console.log(`Verification code sent to ${email}`);
                res.status(200).json({ message: 'Code sent successfully' });;
            } catch(error: any) {
                throw new Error(`Failed to send verification code: ${error}`);
            }
        } catch(error) {
            return next(error);
        }
    });

    return router;
}