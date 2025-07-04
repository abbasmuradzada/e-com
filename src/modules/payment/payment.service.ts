import Stripe from 'stripe';
import { PaymentRepository } from './payment.repository';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
});

export class PaymentService {
    constructor(private readonly paymentRepo: PaymentRepository) {}

    async createStripePaymentIntent(orderId: string, amount: string) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(parseFloat(amount) * 100),
            currency: 'usd',
            metadata: {
                orderId,
            },
        });

        await this.paymentRepo.setStripePaymentId(orderId, paymentIntent.id);

        return { clientSecret: paymentIntent.client_secret };
    }

    async updatePaymentStatusByStripe(
        orderId: string,
        status: 'COMPLETED' | 'FAILED' | 'CANCELLED',
    ) {
        await this.paymentRepo.updateStatusByOrderId(orderId, status);
    }
}
