import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../Controllers/logout.js';
import { isUserVerified } from '../database.js';
import { AuthenticationError } from '../errorHandler.js';

export function hashPassword(password : string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function normalizeEmail(email: string) : string {
  const firstLetter = email.charAt(0).toLowerCase();
  return firstLetter + email.slice(1);
}

export async function verifyToken(token: string | undefined) : Promise<string> {
  let id = undefined;

        if (!token || await isTokenBlacklisted(token)) {
            throw new AuthenticationError('Unauthorized');
        }
        try {
        if (!process.env.JWT_KEY) {
            throw new AuthenticationError('Server misconfiguration: JWT_KEY missing');
        }
        id = (jwt.verify(token, process.env.JWT_KEY) as { id: string }).id;

        if (!isUserVerified(id)) {
            throw new AuthenticationError('User not verified');
        }
        } catch (error) {
            throw new AuthenticationError('Please log in');
        }

        return id;
}