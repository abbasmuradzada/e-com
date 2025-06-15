import { z } from 'zod';

export const createSubCategorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    parentId: z.string().min(1, 'Parent category ID is required'),
});

export const updateSubCategorySchema = createSubCategorySchema.partial();

export type CreateSubCategoryDto = z.infer<typeof createSubCategorySchema>;
export type UpdateSubCategoryDto = z.infer<typeof updateSubCategorySchema>;
