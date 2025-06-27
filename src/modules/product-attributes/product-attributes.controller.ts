import { Request, Response } from 'express';
import { ApiResponse } from '../../common/types/shared';
import { ProductAttributesService } from './product-attributes.service';
import { ProductAttributesResponse } from './product-attributes.types';

export class ProductAttributesController {
    constructor(private readonly productAttributesService: ProductAttributesService) {}

    async create(req: Request, res: Response<ApiResponse<ProductAttributesResponse>>) {
        const product = await this.productAttributesService.create(req.body);
        res.status(201).json({ success: true, ...product });
    }
}
