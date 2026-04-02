export class ValidationError extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

export class UnauthorizedError extends Error {
    statusCode: number;
    constructor(message: string = 'Unauthorized') {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}

export class NotFoundError extends Error {
    statusCode: number;
    constructor(message: string = 'Not found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}