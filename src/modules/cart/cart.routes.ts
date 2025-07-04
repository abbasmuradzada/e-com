import { Router } from 'express';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

const cartRouter = Router();
const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

cartRouter.post('/', authMiddleware, cartController.addCartItem.bind(cartController));

export { cartRouter };
