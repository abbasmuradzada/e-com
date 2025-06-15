import { Router } from 'express';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

const categoryRouter = Router();
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

categoryRouter.post('/', categoryController.create.bind(categoryController));
categoryRouter.get('/', categoryController.findAll.bind(categoryController));
categoryRouter.get('/:id', categoryController.findOne.bind(categoryController));
categoryRouter.patch('/:id', categoryController.update.bind(categoryController));
categoryRouter.delete('/:id', categoryController.remove.bind(categoryController));

export { categoryRouter };
