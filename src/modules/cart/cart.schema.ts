import { z } from 'zod';
import { ProductAttributeTypes } from '@prisma/client';

export const createCartSchema = z.object({
    userId: z.string().min(1, 'User ID is required'),
});

export type CreateCartDto = z.infer<typeof createCartSchema>;

export const createCartItemSchema = z.object({
    cartId: z.string().min(1, 'cartId is required'),
    productId: z.string().min(1, 'productId is required'),
    productsSkuId: z.string().min(1, 'productsSkuId is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
});

export type CreateCartItemDto = z.infer<typeof createCartItemSchema>;
