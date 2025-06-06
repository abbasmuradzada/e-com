import { prisma } from '../../config/prisma/client';
import { createUserSchemaDto } from './user.schema';

export const getAllUsers = () => prisma.user.findMany();

export const getUserById = (id: string) => prisma.user.findUnique({ where: { id } });

export const createUser = (data: createUserSchemaDto) => prisma.user.create({ data });

export const deleteUser = (id: string) => prisma.user.delete({ where: { id } });
