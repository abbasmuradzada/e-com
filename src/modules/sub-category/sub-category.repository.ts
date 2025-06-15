import { SubCategory } from '@prisma/client';
import { CreateSubCategoryDto, UpdateSubCategoryDto } from './sub-category.schema';
import { prisma } from '../../config/prisma/client';

export class SubCategoryRepository {
    async create(data: CreateSubCategoryDto): Promise<SubCategory> {
        return prisma.subCategory.create({ data });
    }

    async findAll(): Promise<SubCategory[]> {
        return prisma.subCategory.findMany({
            where: { deletedAt: null },
            include: { category: true },
        });
    }

    async findById(id: string): Promise<SubCategory | null> {
        return prisma.subCategory.findUnique({
            where: { id, deletedAt: null },
        });
    }

    async update(id: string, data: UpdateSubCategoryDto): Promise<SubCategory> {
        return prisma.subCategory.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<SubCategory> {
        return prisma.subCategory.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }

    async findByCategoryId(categoryId: string): Promise<SubCategory[]> {
        return prisma.subCategory.findMany({
            where: { parentId: categoryId, deletedAt: null },
        });
    }
}
