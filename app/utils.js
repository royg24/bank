import crypto from 'crypto';

export function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|edu|org|co\.il|gov|uk)$/;
    if (!emailRegex.test(email) || email.length > 20 || email.length < 8) {
        return 'Invalid email format';
    }

    return null;
}

export function validatePassword(password) {
    if (password.length < 8 || password.length > 20) {
        return 'Password must be between 8 and 20 characters long';
    }

    return null;
}

export function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^0(\d{2})-(\d{7})$/;
    if (!phoneRegex.test(phoneNumber)) {
        return 'Invalid phone number format';
    }

    return null;
}

export function validateAmount(amount) {
    if (isNaN(amount) || amount <= 0) {
        return 'Amount must be a positive number';
    }

    return null;
}

export function checkRequiredFiled(fieldName, fieldValue) {
    if (!fieldValue || fieldValue.toString().trim() === '') {
        return `The ${fieldName} field is required`;
    }

    return null;
}
