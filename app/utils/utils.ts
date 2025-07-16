import crypto from 'crypto';

export function hashPassword(password : string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function setNumberFormat(phoneNumber: string): string {
    return '+972' + phoneNumber.slice(1).replace(/-/g, '');
}

