
export const validateEmail = {
    required: 'Email is required',
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Invalid email format'
    }
};

export const validatePhoneNumber = {
    required: 'Phone number is rquired',
    pattern: {
        value: /^0(\d{2})-(\d{7})$/,
        message: 'Phone number is not valid'
    }
};

export const validatePassword = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters',
  },
  maxLength: {
    value: 20,
    message: 'Password must be no more than 20 characters',
  },
};

export const validateAmount = {
  required: 'Amount is required',
  pattern: {
        value:  /^(?:[1-9]\d*|0)?(?:\.\d+)?$/,
        message: 'Amount must be a positive number'
    }
}

export const keepPhoneNumberFormat = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    onChange: (value: string) => void) => {
    let val = e.target.value;

    val = val.replace(/\D/g, '');

    if (val.length > 3) {
      val = val.slice(0, 3) + '-' + val.slice(3);
    }
    
    if (val.length < 12) {
      onChange(val);
    }
  };
