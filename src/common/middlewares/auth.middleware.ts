import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/shared';

interface JwtPayload {
    userId: string;
    iat: number;
    exp: number;
}

export interface AuthenticatedRequest extends Request {
    user: JwtPayload;
}

export const authMiddleware = (req: Request, _: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Authorization header missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        // fixit - now request don't know it has user field, add somehow new type to request
        (req as AuthenticatedRequest).user = decoded;
        next();
    } catch (error) {
        throw new UnauthorizedError('Invalid or expired token');
    }
};
