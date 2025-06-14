import { prisma } from '../../config/prisma/client';
import { RegisterSchemaDto } from './user.schema';
import { User } from '@prisma/client';

export class UserRepository {
    async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async create(data: RegisterSchemaDto): Promise<User> {
        return prisma.user.create({ data });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async findByGoogleId(googleId: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { googleId } });
    }

    async updateUser(
        id: string,
        data: Partial<{
            googleId: string;
            isEmailVerified: boolean;
            name: string;
        }>,
    ): Promise<User> {
        return prisma.user.update({ where: { id }, data });
    }
}
