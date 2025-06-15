import { Router } from 'express';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryRepository } from './sub-category.repository';
import { SubCategoryService } from './sub-category.service';

const subCategoryRouter = Router();
const subCategoryRepository = new SubCategoryRepository();
const subCategoryService = new SubCategoryService(subCategoryRepository);
const subCategoryController = new SubCategoryController(subCategoryService);

subCategoryRouter.post('/', subCategoryController.create.bind(subCategoryController));
subCategoryRouter.get('/', subCategoryController.findAll.bind(subCategoryController));
subCategoryRouter.get('/:id', subCategoryController.findOne.bind(subCategoryController));
subCategoryRouter.patch('/:id', subCategoryController.update.bind(subCategoryController));
subCategoryRouter.delete('/:id', subCategoryController.remove.bind(subCategoryController));

export { subCategoryRouter };
