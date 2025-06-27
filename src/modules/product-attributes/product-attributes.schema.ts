import { z } from 'zod';
import { ProductAttributeTypes } from '@prisma/client';

export const createProductAttributesSchema = z.object({
    type: z.nativeEnum(ProductAttributeTypes),
    value: z.string().min(1, 'Value is required'),
});

export type CreateProductAttributeDto = z.infer<typeof createProductAttributesSchema>;
