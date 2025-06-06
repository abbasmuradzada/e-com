import { User } from '@prisma/client';

export type UserEntity = User;

export interface UserService {
    getAllUsers(): Promise<UserEntity[]>;
    getUserById(id: string): Promise<UserEntity | null>;
    createUser(data: { email: string; name?: string }): Promise<UserEntity>;
    deleteUser(id: string): Promise<void>;
}

export type UserResponse = {
    id: string;
    email: string;
    name: string | null;
    createdAt: Date;
};

export type GetAllUsersResponse = UserResponse[];
export type GetUserByIdResponse = UserResponse | { message: string };
