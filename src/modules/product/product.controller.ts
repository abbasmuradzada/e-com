import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { ApiResponse } from '../../common/types/shared';
import { ProductResponse } from './product.types';
import { NotFoundError } from '../../common/errors/shared';
import { AuthenticatedRequest } from '../../common/middlewares/auth.middleware';

export class ProductController {
    constructor(private readonly productService: ProductService) {}

    async create(req: Request, res: Response<ApiResponse<ProductResponse>>) {
        const product = await this.productService.create(req.body);
        res.status(201).json({ success: true, ...product });
    }

    async findAll(_req: Request, res: Response<ApiResponse<ProductResponse>>) {
        const products = await this.productService.findAll();
        res.json({ success: true, ...products });
    }

    async findOne(req: Request, res: Response<ApiResponse<ProductResponse>>) {
        const product = await this.productService.findOne(req.params.id);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        res.json({ success: true, ...product });
    }

    async update(req: Request, res: Response<ApiResponse<ProductResponse>>) {
        const product = await this.productService.update(req.params.id, req.body);
        res.json({ success: true, ...product });
    }

    async remove(req: Request, res: Response<ApiResponse<ProductResponse>>) {
        await this.productService.remove(req.params.id);
        res.status(204).send();
    }

    async findByCategory(req: Request, res: Response<ApiResponse<ProductResponse>>) {
        const products = await this.productService.findByCategoryId(req.params.categoryId);
        res.json({ success: true, ...products });
    }
}
