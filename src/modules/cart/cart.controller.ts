import { Request, Response } from 'express';
import { CartService } from './cart.service';
import { ApiResponse } from '../../common/types/shared';
import { CreateCartItemDto } from './cart.schema';

export class CartController {
    constructor(private readonly cartService: CartService) {}

    async addCartItem(req: Request, res: Response<ApiResponse<any>>) {
        const userId = req.user.userId;
        const dto: Omit<CreateCartItemDto, 'cartId'> = req.body;

        const item = await this.cartService.addCartItem(userId, dto);

        res.status(201).json({ success: true, data: item });
    }

    // PUT /cart/items/:id
    // async updateCartItem(req: Request, res: Response<ApiResponse<CartItemResponse>>) {
    //     const dto: UpdateCartItemDto = {
    //         id: req.params.id,
    //         ...req.body,
    //     };
    //
    //     const item = await this.cartService.updateCartItem(dto);
    //     res.status(200).json({ success: true, data: item });
    // }
    //
    // // DELETE /cart/items/:id
    // async removeCartItem(req: Request, res: Response<ApiResponse<null>>) {
    //     const id = req.params.id;
    //     await this.cartService.removeCartItem(id);
    //     res.status(204).json({ success: true, data: null });
    // }
    //
    // // GET /cart
    // async getUserCart(req: Request, res: Response<ApiResponse<CartResponse>>) {
    //     const userId = req.user.id;
    //     const cart = await this.cartService.getCartByUserId(userId);
    //     res.status(200).json({ success: true, data: cart });
    // }
}
