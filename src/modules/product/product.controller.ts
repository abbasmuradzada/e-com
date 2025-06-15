import { Request, Response } from 'express';
import { ProductService } from './product.service';

export class ProductController {
    constructor(private readonly productService: ProductService) {}

    async create(req: Request, res: Response) {
        const product = await this.productService.create(req.body);
        res.status(201).json(product);
    }

    async findAll(_req: Request, res: Response) {
        const products = await this.productService.findAll();
        res.json(products);
    }

    async findOne(req: Request, res: Response) {
        const product = await this.productService.findOne(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }

    async update(req: Request, res: Response) {
        const product = await this.productService.update(req.params.id, req.body);
        res.json(product);
    }

    async remove(req: Request, res: Response) {
        await this.productService.remove(req.params.id);
        res.status(204).send();
    }

    async findByCategory(req: Request, res: Response) {
        const products = await this.productService.findByCategoryId(req.params.categoryId);
        res.json(products);
    }
}
