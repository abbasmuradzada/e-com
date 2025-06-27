import { ProductAttributes } from '@prisma/client';
import { prisma } from '../../config/prisma/client';
import { CreateProductAttributeDto } from './product-attributes.schema';

export class ProductAttributesRepository {
    async create(data: CreateProductAttributeDto): Promise<ProductAttributes> {
        return prisma.productAttributes.create({ data });
    }

    async getById(id: string): Promise<ProductAttributes | null> {
        return prisma.productAttributes.findUnique({ where: { id } });
    }
}
