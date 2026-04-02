import { Request, Response, NextFunction } from 'express';
import { ValidationError, UnauthorizedError, NotFoundError } from '../utils/errors';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof UnauthorizedError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof NotFoundError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    if (err.code === 'P2002') {
        return res.status(400).json({ message: 'Duplicate unique field' });
    }
    if (err.code === 'P2025') {
        return res.status(404).json({ message: 'Record not found' });
    }

    res.status(500).json({ message: 'Internal server error' });
}