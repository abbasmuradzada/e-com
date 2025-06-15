import { Request, Response } from 'express';
import { CategoryService } from './category.service';

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    async create(req: Request, res: Response) {
        const category = await this.categoryService.create(req.body);
        res.status(201).json(category);
    }

    async findAll(_req: Request, res: Response) {
        const categories = await this.categoryService.findAll();
        res.json(categories);
    }

    async findOne(req: Request, res: Response) {
        const category = await this.categoryService.findOne(req.params.id);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    }

    async update(req: Request, res: Response) {
        const category = await this.categoryService.update(req.params.id, req.body);
        res.json(category);
    }

    async remove(req: Request, res: Response) {
        await this.categoryService.remove(req.params.id);
        res.status(204).send();
    }
}
