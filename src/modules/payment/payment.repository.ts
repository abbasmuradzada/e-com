import { prisma } from '../../config/prisma/client';
import { PaymentStatus } from '@prisma/client';

export class PaymentRepository {
    async updateStatusByOrderId(orderId: string, status: PaymentStatus) {
        return prisma.paymentDetails.update({
            where: { orderId },
            data: { status },
        });
    }

    async setStripePaymentId(orderId: string, stripePaymentId: string) {
        return prisma.paymentDetails.update({
            where: { orderId },
            data: {
                provider: `STRIPE:${stripePaymentId}`,
            },
        });
    }
}
