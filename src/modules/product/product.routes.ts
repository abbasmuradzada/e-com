import { Router } from 'express';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';

const productRouter = Router();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

productRouter.post('/', productController.create.bind(productController));
productRouter.patch('/:id', productController.update.bind(productController));
productRouter.delete('/:id', productController.remove.bind(productController));
productRouter.get('/', productController.findAll.bind(productController));
productRouter.get('/:id', productController.findOne.bind(productController));
productRouter.get(
    '/category/:categoryId',
    productController.findByCategory.bind(productController),
);

export { productRouter };
