import { CartRepository } from './cart.repository';
import { CreateCartItemDto } from './cart.schema';
import { ProductAttributesResponse } from './cart.types';
import { UserRepository } from '../user/user.repository';

export class CartService {
    constructor(
        // private readonly userRepository: UserRepository,
        private readonly cartRepository: CartRepository,
    ) {}

    async addCartItem(userId: string, data: Omit<CreateCartItemDto, 'cartId'>): Promise<void> {
        let cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            cart = await this.cartRepository.createCart({ userId });
        }

        const existingItem = await this.cartRepository.findItemBySku(cart.id, data.productsSkuId);

        if (existingItem) {
            await this.cartRepository.updateCartItem({
                id: existingItem.id,
                quantity: existingItem.quantity + data.quantity,
            });
        } else {
            await this.cartRepository.createCartItem({
                ...data,
                cartId: cart.id,
            });
        }

        await this.cartRepository.updateCartTotal(cart.id);
    }
}
