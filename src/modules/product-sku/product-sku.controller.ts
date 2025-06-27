import { Request, Response } from 'express';
import { ApiResponse } from '../../common/types/shared';
import { ProductSkuService } from './product-sku.service';
import { ProductSkuResponse } from './product-sku.types';

export class ProductSkuController {
    constructor(private readonly productSkuService: ProductSkuService) {}

    async create(req: Request, res: Response<ApiResponse<ProductSkuResponse>>) {
        const product = await this.productSkuService.create(req.body);
        res.status(201).json({ success: true, ...product });
    }
}
