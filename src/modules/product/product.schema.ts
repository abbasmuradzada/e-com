import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    summary: z.string().min(1, 'Summary is required'),
    cover: z.string().min(1, 'Cover image URL is required'),
    categoryId: z.string().min(1, 'Category ID is required'),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
