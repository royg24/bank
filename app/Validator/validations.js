
export function validateLogin(body) {
  const requiredError = checkRequiredFields(body, ['email', 'password']);
  if (requiredError) return requiredError;

  const emailError = validateEmail(body.email);
  if (emailError) return emailError;

  const passwordError = validatePassword(body.password);
  if (passwordError) return passwordError;

  return null;
}

export function validateSignUp(body) {
  const requiredError = checkRequiredFields(body, ['email', 'password', 'phoneNumber']);
  if (requiredError) return requiredError;

  const emailError = validateEmail(body.email);
  if (emailError) return emailError;

  const passwordError = validatePassword(body.password);
  if (passwordError) return passwordError;

  const phoneError = validatePhoneNumber(body.phoneNumber);
  if (phoneError) return phoneError;

  return null;
}

export function validateTransfer(body) {
  const requiredError = checkRequiredFields(body, ['receiverEmail', 'amount']);
  if (requiredError) return requiredError;

  const receiverError = validateEmail(body.receiverEmail);
  if (receiverError) return receiverError;

  const amountError = validateAmount(body.amount);
  if (amountError) return amountError;

  return null;
}

function checkRequiredFields(body, fields) {
  for (const field of fields) {
    const error = checkRequiredField(field, body[field]);
    if (error) return error;
  }
  return null;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|edu|org|co\.il|gov|uk)$/;
    if (!emailRegex.test(email) || email.length > 20 || email.length < 8) {
        return 'Invalid email format';
    }

    return null;
}

function validatePassword(password) {
    if (password.length < 8 || password.length > 20) {
        return 'Password must be between 8 and 20 characters long';
    }

    return null;
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^0(\d{2})-(\d{7})$/;
    if (!phoneRegex.test(phoneNumber)) {
        return 'Invalid phone number format';
    }

    return null;
}

function validateAmount(amount) {
    if (isNaN(amount) || amount <= 0) {
        return 'Amount must be a positive number';
    }

    return null;
}

function checkRequiredField(fieldName, fieldValue) {
    if (!fieldValue || fieldValue.toString().trim() === '') {
        return `The ${fieldName} field is required`;
    }

    return null;
}
