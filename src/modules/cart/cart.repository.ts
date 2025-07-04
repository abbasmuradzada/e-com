import { Cart, CartItem, Prisma, ProductAttributes } from '@prisma/client';
import { prisma } from '../../config/prisma/client';
import { CreateCartDto, CreateCartItemDto } from './cart.schema';

export class CartRepository {
    async createCart(data: CreateCartDto): Promise<Cart> {
        return prisma.cart.create({
            data: {
                ...data,
                total: new Prisma.Decimal(0),
            },
        });
    }

    async createCartItem(data: CreateCartItemDto): Promise<CartItem> {
        return prisma.cartItem.create({
            data,
        });
    }

    async updateCartItem(data: Partial<CreateCartItemDto> & { id: string }): Promise<CartItem> {
        const { id, ...rest } = data;

        return prisma.cartItem.update({
            where: { id },
            data: rest,
        });
    }

    async deleteCartItem(id: string): Promise<void> {
        await prisma.cartItem.delete({ where: { id } });
    }

    async updateCartTotal(cartId: string): Promise<void> {
        const items = await prisma.cartItem.findMany({
            where: { cartId },
            include: {
                productsSkus: true,
            },
        });

        const total = items.reduce((sum, item) => {
            const itemTotal = item.productsSkus.price.mul(item.quantity);
            return sum.add(itemTotal);
        }, new Prisma.Decimal(0));

        await prisma.cart.update({
            where: { id: cartId },
            data: { total },
        });
    }
    async findByUserId(userId: string): Promise<Cart | null> {
        return prisma.cart.findFirst({ where: { userId } });
    }

    async findItemBySku(cartId: string, productsSkuId: string): Promise<CartItem | null> {
        return prisma.cartItem.findFirst({
            where: { cartId, productsSkuId },
        });
    }

    async getItemsByCartId(cartId: string) {
        return prisma.cartItem.findMany({
            where: { cartId },
            select: {
                productId: true,
                productsSkuId: true,
                quantity: true,
            },
        });
    }
}
