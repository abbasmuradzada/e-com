import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import { NotFoundError } from '../../common/errors/shared';
import { ApiResponse } from '../../common/types/shared';
import { CategoryResponse } from './category.types';

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    async create(req: Request, res: Response<ApiResponse<CategoryResponse>>) {
        const category = await this.categoryService.create(req.body);
        res.status(201).json({ success: true, ...category });
    }

    async findAll(_req: Request, res: Response<ApiResponse<CategoryResponse>>) {
        const categories = await this.categoryService.findAll();
        res.json({ success: true, ...categories });
    }

    async findOne(req: Request, res: Response<ApiResponse<CategoryResponse>>) {
        const category = await this.categoryService.findOne(req.params.id);
        if (!category) {
            throw new NotFoundError('Category not found');
        }
        res.json({ success: true, ...category });
    }

    async update(req: Request, res: Response<ApiResponse<CategoryResponse>>) {
        const category = await this.categoryService.update(req.params.id, req.body);
        res.json({ success: true, ...category });
    }

    async remove(req: Request, res: Response<ApiResponse<CategoryResponse>>) {
        await this.categoryService.remove(req.params.id);
        res.status(204).send();
    }
}
