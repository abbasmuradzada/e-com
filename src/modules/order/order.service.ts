import { PaymentService } from '../payment/payment.service';
import { OrderRepository } from './order.repository';
import { CartRepository } from '../cart/cart.repository';
import { CreateOrderDto } from './order.schema';

export class OrderService {
    constructor(
        private readonly orderRepo: OrderRepository,
        private readonly cartRepo: CartRepository,
        private readonly paymentService: PaymentService,
    ) {}

    async submitOrder({ userId }: CreateOrderDto) {
        const cart = await this.cartRepo.findByUserId(userId);
        if (!cart || cart.total.toNumber() === 0) throw new Error('Cart is empty');

        const items = await this.cartRepo.getItemsByCartId(cart.id);
        if (!items.length) throw new Error('No items in cart');

        const order = await this.orderRepo.createOrder(userId, cart.total.toString());
        await this.orderRepo.createOrderItems(order.id, items);

        const payment = await this.orderRepo.createPayment(order.id, cart.total.toString());

        const paymentIntent = await this.paymentService.createStripePaymentIntent(
            order.id,
            cart.total.toString(),
        );

        await this.orderRepo.deleteCartItems(cart.id);
        await this.cartRepo.updateCartTotal(cart.id);

        console.log('paymentIntent ', paymentIntent);

        return {
            orderId: order.id,
            total: order.total.toString(),
            status: 'PENDING',
            paymentId: payment.id,
            clientSecret: paymentIntent.clientSecret,
        };
    }
}
