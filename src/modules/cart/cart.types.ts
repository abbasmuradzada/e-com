import { ProductAttributeTypes } from '@prisma/client';

export interface ProductAttributesResponse {
    type: ProductAttributeTypes;
    value: string;
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
}
