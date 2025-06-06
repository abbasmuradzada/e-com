import { Request, Response } from 'express';
import * as userService from './user.service';
import { createUserSchemaDto } from './user.schema';
import { GetAllUsersResponse, GetUserByIdResponse, UserResponse } from './user.types';

export const getAllUsers = async (
    _req: Request,
    res: Response<GetAllUsersResponse>,
): Promise<void> => {
    const users = await userService.getAllUsers();
    res.json(users);
};

export const getUserById = async (
    req: Request<{ id: string }>,
    res: Response<GetUserByIdResponse>,
): Promise<void> => {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json(user);
};

export const createUser = async (
    req: Request<{}, {}, createUserSchemaDto>,
    res: Response<UserResponse>,
): Promise<void> => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
};

export const deleteUser = async (
    req: Request<{ id: string }>,
    res: Response<void>,
): Promise<void> => {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
};
