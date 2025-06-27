import { Router } from 'express';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { ProductSkuRepository } from './product-sku.repository';
import { ProductSkuService } from './product-sku.service';
import { ProductSkuController } from './product-sku.controller';
import { ProductAttributesRepository } from '../product-attributes/product-attributes.repository';
import { ProductRepository } from '../product/product.repository';

const productSkuRouter = Router();
const productSkuRepository = new ProductSkuRepository();
const productAttributesRepository = new ProductAttributesRepository();
const productRepository = new ProductRepository();
const productSkuService = new ProductSkuService(
    productSkuRepository,
    productAttributesRepository,
    productRepository,
);
const productSkuController = new ProductSkuController(productSkuService);

productSkuRouter.post('/', authMiddleware, productSkuController.create.bind(productSkuController));

export { productSkuRouter };
