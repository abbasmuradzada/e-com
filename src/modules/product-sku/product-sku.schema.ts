import { z } from 'zod';
import { ProductAttributeTypes } from '@prisma/client';

export const createProductSkuSchema = z.object({
    productId: z.string().min(1, 'productId is required'),
    sizeAttributeId: z.string().min(1, 'sizeAttributeId is required'),
    colorAttributeId: z.string().min(1, 'colorAttributeId is required'),
    // sku: z.string().min(1, 'sku is required'),
    price: z.number().min(0, 'Price must be 0 or greater'),
    quantity: z.number().min(1, 'productId is required'),
});

export type CreateProductSkuDto = z.infer<typeof createProductSkuSchema>;
