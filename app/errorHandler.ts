import { Response, Request, NextFunction } from 'express';

class AppError extends Error {
    code: number;

    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    handle(res: Response): Response {
        return res.status(this.code).json({error: this.message});
    }
}

class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

class AuthenticationError extends AppError {
    constructor(message: string) {
        super(message, 401);
    }
}

class DataError extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}

class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
}

class ServerError extends AppError {
    constructor(message: string) {
        super(message, 500);
    }
}

export function handleError(error: any, req: Request, res: Response, next: NextFunction)
    : Response | void {
    console.error(error);
    if (typeof error.handle === 'function') {
        return error.handle(res);
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {ValidationError, AuthenticationError, DataError, NotFoundError, ServerError};