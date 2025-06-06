import * as repo from './user.repository';
import { createUserSchemaDto } from './user.schema';

export const getAllUsers = () => repo.getAllUsers();

export const getUserById = (id: string) => repo.getUserById(id);

export const createUser = (data: createUserSchemaDto) => repo.createUser(data);

export const deleteUser = (id: string) => repo.deleteUser(id);
