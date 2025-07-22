import crypto from 'crypto';

export function hashPassword(password : string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function normalizeEmail(email: string) : string {
  const firstLetter = email.charAt(0).toLowerCase();
  return firstLetter + email.slice(1);
}