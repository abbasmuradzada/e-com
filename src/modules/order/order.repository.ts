import { prisma } from '../../config/prisma/client';

export class OrderRepository {
    async createOrder(userId: string, total: string) {
        return prisma.orderDetails.create({
            data: {
                userId,
                total,
            },
        });
    }

    async createOrderItems(orderId: string, items: any[]) {
        const data = items.map(item => ({
            orderId,
            productId: item.productId,
            productsSkuId: item.productsSkuId,
            quantity: item.quantity,
        }));

        return prisma.orderItem.createMany({ data });
    }

    async createPayment(orderId: string, amount: string) {
        return prisma.paymentDetails.create({
            data: {
                orderId,
                amount,
                provider: 'STRIPE',
                status: 'PENDING',
            },
        });
    }

    async updatePaymentStatus(paymentId: string, status: 'COMPLETED' | 'FAILED') {
        return prisma.paymentDetails.update({
            where: { id: paymentId },
            data: { status },
        });
    }

    async deleteCartItems(cartId: string) {
        return prisma.cartItem.deleteMany({ where: { cartId } });
    }
}
