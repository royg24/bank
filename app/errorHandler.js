
class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }

    handle(res) {
        res.status(this.code).json({error: this.message});
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

class AuthenticationError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}

class DataError extends AppError {
    constructor(message) {
        super(message, 409);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

class ServerError extends AppError {
    constructor(message) {
        super(message, 500);
    }
}

export function handleError(error, req, res, next) {
    console.error(error);
    if (error.handle) {
        return error.handle(res);
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {ValidationError, AuthenticationError, DataError, NotFoundError, ServerError};