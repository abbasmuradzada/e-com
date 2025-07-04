import { Router } from 'express';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { CartRepository } from '../cart/cart.repository';
import { PaymentRepository } from '../payment/payment.repository';
import { PaymentService } from '../payment/payment.service';

const orderRouter = Router();

const orderRepo = new OrderRepository();
const cartRepo = new CartRepository();
const paymentRepo = new PaymentRepository();
const paymentService = new PaymentService(paymentRepo);
const orderService = new OrderService(orderRepo, cartRepo, paymentService);
const orderController = new OrderController(orderService);

orderRouter.post('/submit', authMiddleware, orderController.submitOrder.bind(orderController));

export { orderRouter };
