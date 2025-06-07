import { Request, Response } from 'express';
import { UserService } from './user.service';
import { validateRegisterInput, validateLoginInput } from './user.schema';
import { UserResponse } from './user.types';
import { ApiResponse } from '../../common/types/shared';
import { AppError } from '../../common/errors/shared';

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
}
