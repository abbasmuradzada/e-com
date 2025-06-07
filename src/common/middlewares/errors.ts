import { ErrorRequestHandler } from 'express';
import { AppError } from '../errors/shared';

export const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: err.message,
            details: err.details,
        });
        return;
    }

    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
    });
    return;
};
