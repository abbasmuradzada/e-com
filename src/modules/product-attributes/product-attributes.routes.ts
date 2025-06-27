import { Router } from 'express';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { ProductAttributesRepository } from './product-attributes.repository';
import { ProductAttributesService } from './product-attributes.service';
import { ProductAttributesController } from './product-attributes.controller';

const productAttributesRouter = Router();
const productAttributesRepository = new ProductAttributesRepository();
const productAttributesService = new ProductAttributesService(productAttributesRepository);
const productAttributesController = new ProductAttributesController(productAttributesService);

productAttributesRouter.post(
    '/',
    authMiddleware,
    productAttributesController.create.bind(productAttributesController),
);

export { productAttributesRouter };
