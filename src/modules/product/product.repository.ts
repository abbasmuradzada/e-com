import { Product } from '@prisma/client';
import { prisma } from '../../config/prisma/client';
import { CreateProductDto, UpdateProductDto } from './product.schema';
import { ProductWithCategory } from './product.types';

export class ProductRepository {
    async create(data: CreateProductDto): Promise<Product> {
        return prisma.product.create({ data });
    }

    async findAll(): Promise<Product[]> {
        return prisma.product.findMany({
            where: { deletedAt: null },
            include: { subCategory: true },
        });
    }

    async findById(id: string): Promise<ProductWithCategory | null> {
        return prisma.product.findUnique({
            where: { id, deletedAt: null },
            include: { subCategory: true },
        });
    }

    async update(id: string, data: UpdateProductDto): Promise<Product> {
        return prisma.product.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<Product> {
        return prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }

    async findByCategoryId(categoryId: string): Promise<Product[]> {
        return prisma.product.findMany({
            where: {
                subCategory: {
                    parentId: categoryId,
                    deletedAt: null,
                },
                deletedAt: null,
            },
            include: { subCategory: true },
        });
    }
}
