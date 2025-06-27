import { Decimal } from '@prisma/client/runtime/library';

export interface ProductSkuResponse {
    productId: string;
    sizeAttributeId: string;
    colorAttributeId: string;
    sku: string;
    price: Decimal;
    quantity: number;
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
}
