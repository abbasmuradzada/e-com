import { UserRepository } from './user.repository';
import { RegisterSchemaDto, LoginSchemaDto } from './user.schema';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConflictError, UnauthorizedError } from '../../common/errors/shared';

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async register(
        data: Omit<RegisterSchemaDto, 'passwordHash'> & { password: string },
    ): Promise<{ user: User; token: string }> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new ConflictError('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userRepository.create({
            email: data.email,
            passwordHash: hashedPassword,
            name: data.name,
        });

        const token = this.generateToken(user.id);

        return { user, token };
    }

    async login(data: LoginSchemaDto): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new UnauthorizedError();
        }

        const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);
        if (!isValidPassword) {
            throw new UnauthorizedError();
        }

        const token = this.generateToken(user.id);

        return { user, token };
    }

    private generateToken(userId: string): string {
        const JWT_SECRET = process.env.JWT_SECRET as string;
        return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
