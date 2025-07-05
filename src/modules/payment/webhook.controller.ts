import Stripe from 'stripe';
import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const paymentService = new PaymentService(new PaymentRepository());

export const stripeWebhookHandler = async (req: Request, res: Response) => {
    console.log('salam');

    const sig = req.headers['stripe-signature'];

    console.log('abbaaaaass Stripe Webhook Handler Retrieving Stripe...', req);

    let event: Stripe.Event;
    try {
        console.log('abbas trieddd');
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log('abbas catched error', err);
        console.error('❌ Webhook signature verification failed', err);
        res.status(400).send(`Webhook Error: ${err}`);
    }

    const intent = event.data.object as Stripe.PaymentIntent;
    const orderId = intent.metadata?.orderId;

    if (!orderId) res.status(400).send('Missing order ID');

    switch (event.type) {
        case 'payment_intent.succeeded':
            await paymentService.updatePaymentStatusByStripe(orderId, 'COMPLETED');
            break;
        case 'payment_intent.payment_failed':
            await paymentService.updatePaymentStatusByStripe(orderId, 'FAILED');
            break;
        case 'payment_intent.canceled':
            await paymentService.updatePaymentStatusByStripe(orderId, 'CANCELLED');
            break;
    }

    res.status(200).json({ received: true });
};
