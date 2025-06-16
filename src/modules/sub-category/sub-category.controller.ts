import { Request, Response } from 'express';
import { SubCategoryService } from './sub-category.service';
import { ApiResponse } from '../../common/types/shared';
import { SubCategoryResponse } from './sub-category.types';
import { NotFoundError } from '../../common/errors/shared';

export class SubCategoryController {
    constructor(private readonly subCategoryService: SubCategoryService) {}

    async create(req: Request, res: Response<ApiResponse<SubCategoryResponse>>) {
        const subCategory = await this.subCategoryService.create(req.body);
        res.status(201).json({ success: true, ...subCategory });
    }

    async findAll(_req: Request, res: Response<ApiResponse<SubCategoryResponse>>) {
        const subCategories = await this.subCategoryService.findAll();
        res.json({ success: true, ...subCategories });
    }

    async findOne(req: Request, res: Response<ApiResponse<SubCategoryResponse>>) {
        const subCategory = await this.subCategoryService.findOne(req.params.id);
        if (!subCategory) {
            throw new NotFoundError('Sub-category not found');
        }
        res.json({ success: true, ...subCategory });
    }

    async update(req: Request, res: Response<ApiResponse<SubCategoryResponse>>) {
        const subCategory = await this.subCategoryService.update(req.params.id, req.body);
        res.json({ success: true, ...subCategory });
    }

    async remove(req: Request, res: Response<ApiResponse<SubCategoryResponse>>) {
        await this.subCategoryService.remove(req.params.id);
        res.status(204).send();
    }

    async findByCategory(req: Request, res: Response<ApiResponse<SubCategoryResponse>>) {
        const subCategories = await this.subCategoryService.findByCategoryId(req.params.categoryId);
        res.json({ success: true, ...subCategories });
    }
}
