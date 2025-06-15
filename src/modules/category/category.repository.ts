import { prisma } from '../../config/prisma/client';
import { Category } from '@prisma/client';
import { CreateCategoryDto, UpdateCategoryDto } from './category.schema';

export class CategoryRepository {
    async create(data: CreateCategoryDto): Promise<Category> {
        return prisma.category.create({ data });
    }

    async findAll(): Promise<Category[]> {
        return prisma.category.findMany({
            where: { deletedAt: null },
        });
    }

    async findById(id: string): Promise<Category | null> {
        return prisma.category.findUnique({
            where: { id, deletedAt: null },
        });
    }

    async update(id: string, data: UpdateCategoryDto): Promise<Category> {
        return prisma.category.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<Category> {
        return prisma.category.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
