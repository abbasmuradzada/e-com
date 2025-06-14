import { Request, Response } from 'express';
import { UserService } from './user.service';
import { validateRegisterInput, validateLoginInput } from './user.schema';
import { UserResponse } from './user.types';
import { ApiResponse } from '../../common/types/shared';
import { User } from '@prisma/client';
import { UnauthorizedError } from '../../common/errors/shared';

export class UserController {
    constructor(private readonly userService: UserService) {}

    async register(req: Request, res: Response<ApiResponse<UserResponse>>) {
        const validatedData = validateRegisterInput({
            email: req.body.email,
            passwordHash: req.body.password,
            name: req.body.name,
        });

        const { user, token } = await this.userService.register({
            email: validatedData.email,
            password: req.body.password,
            name: validatedData.name,
        });

        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                token,
            },
        });
    }

    async login(req: Request, res: Response<ApiResponse<UserResponse>>) {
        const validatedData = validateLoginInput(req.body);

        const { user, token } = await this.userService.login(validatedData);

        res.status(200).json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                token,
            },
        });
    }

    async googleAuthSuccess(req: Request, res: Response) {
        const user = req.user as User | undefined;
        if (!user) {
            return res.redirect('/users/failure');
        }

        const { email, name } = user;

        const { user: finalUser, token } = await this.userService.loginWithGoogle({
            email,
            name,
        });

        const response: UserResponse = {
            id: finalUser.id,
            email: finalUser.email,
            name: finalUser.name || null,
            token,
        };

        // --- fixit (redirect to origin url)
        res.redirect(
            `http://localhost:3000/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(response))}`,
        );
    }

    googleAuthFailure(_req: Request, _res: Response) {
        throw new UnauthorizedError('Google authentication failed');
    }
}
