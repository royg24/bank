
interface LoginBody {
  email: string;
  password: string;
}

export function validateLogin(body: LoginBody): string | null {
  const requiredError = checkRequiredFields(body, ['email', 'password']);
  if (requiredError) return requiredError;

  const emailError = validateEmail(body.email);
  if (emailError) return emailError;

  const passwordError = validatePassword(body.password);
  if (passwordError) return passwordError;

  return null;
}

interface SignUpBody {
  email: string;
  password: string;
  phoneNumber: string;
}

export function validateSignUp(body: SignUpBody): string | null {
  const requiredError = checkRequiredFields(body, ['email', 'password', 'phoneNumber']);
  if (requiredError) {
    return requiredError
  };

  const emailError = validateEmail(body.email);
  if (emailError) {
    return emailError
  };

  const passwordError = validatePassword(body.password);
  if (passwordError) {
    return passwordError
  };

  const phoneError = validatePhoneNumber(body.phoneNumber);
  if (phoneError) {
    return phoneError
  };

  return null;
}

interface TransferBody {
  receiverEmail: string;
  amount: number;
}

export function validateTransfer(body: TransferBody): string | null {
  const requiredError = checkRequiredFields(body, ['receiverEmail', 'amount']);
  if (requiredError) {
    return requiredError
  };

  const receiverError = validateEmail(body.receiverEmail);
  if (receiverError) {
    return receiverError
  };

  const amountError = validateAmount(body.amount);
  if (amountError) {
  	return amountError
  };

  return null;
}

interface validateBody {
	email: string,
	code: number
}

export function validateValidate(body: validateBody): string | null {
	const emailError = validateEmail(body.email);
	if (emailError) {
		return emailError;
	}

	const codeError = validateCode(body.code);
	if (codeError) {
		return codeError;
	}

	return null;
}

export function validateSend(phoneNumber: string): string | null {
	const phoneNumberError = validatePhoneNumber(phoneNumber);
	return phoneNumberError || null;
}

interface CheckRequiredFieldsBody {
  [key: string]: any;
}

type FieldsArray = string[];

function checkRequiredFields(body: CheckRequiredFieldsBody, fields: FieldsArray): string | null {
  for (const field of fields) {
    const error = checkRequiredField(field, body[field]);
    if (error) return error;
  }
  return null;
}

function validateEmail(email : string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|edu|org|co\.il|gov|uk)$/;
    if (!emailRegex.test(email) || email.length > 20 || email.length < 8) {
        return 'Invalid email format';
    }

    return null;
}

function validatePassword(password : string) {
    if (password.length < 8 || password.length > 20) {
        return 'Password must be between 8 and 20 characters long';
    }

    return null;
}

function validatePhoneNumber(phoneNumber : string) {
    const phoneRegex = /^0(\d{2})-(\d{7})$/;
    if (!phoneRegex.test(phoneNumber)) {
        return 'Invalid phone number format';
    }

    return null;
}

function validateAmount(amount : number) {
    if (isNaN(amount) || amount <= 0) {
        return 'Amount must be a positive number';
    }

    return null;
}

function validateCode(code: number) {
  if (isNaN(code) || code < 100000 || code > 999999) {
    return 'Code must be 6 digits number';
  }

  return null;
}

function checkRequiredField(fieldName: string, fieldValue: any): string | null {
    if (!fieldValue || fieldValue.toString().trim() === '') {
        return `The ${fieldName} field is required`;
    }

    return null;
}
