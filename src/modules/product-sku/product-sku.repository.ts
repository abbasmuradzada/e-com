import { ProductSkus } from '@prisma/client';
import { prisma } from '../../config/prisma/client';
import { CreateProductSkuDto } from './product-sku.schema';

export class ProductSkuRepository {
    async create(
        data: CreateProductSkuDto & {
            sku: string;
        },
    ): Promise<ProductSkus> {
        return prisma.productSkus.create({ data });
    }
}
