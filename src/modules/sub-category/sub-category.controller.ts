import { Request, Response } from 'express';
import { SubCategoryService } from './sub-category.service';

export class SubCategoryController {
    constructor(private readonly subCategoryService: SubCategoryService) {}

    async create(req: Request, res: Response) {
        const subCategory = await this.subCategoryService.create(req.body);
        res.status(201).json(subCategory);
    }

    async findAll(_req: Request, res: Response) {
        const subCategories = await this.subCategoryService.findAll();
        res.json(subCategories);
    }

    async findOne(req: Request, res: Response) {
        const subCategory = await this.subCategoryService.findOne(req.params.id);
        if (!subCategory) {
            res.status(404).json({ message: 'Sub-category not found' });
        }
        res.json(subCategory);
    }

    async update(req: Request, res: Response) {
        const subCategory = await this.subCategoryService.update(req.params.id, req.body);
        res.json(subCategory);
    }

    async remove(req: Request, res: Response) {
        await this.subCategoryService.remove(req.params.id);
        res.status(204).send();
    }

    async findByCategory(req: Request, res: Response) {
        const subCategories = await this.subCategoryService.findByCategoryId(req.params.categoryId);
        res.json(subCategories);
    }
}
