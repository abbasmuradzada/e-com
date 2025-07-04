import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { ApiResponse } from '../../common/types/shared';

export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    async submitOrder(req: Request, res: Response<ApiResponse<any>>) {
        const userId = req.user.userId;

        const result = await this.orderService.submitOrder({ userId });

        res.status(201).json({ success: true, data: result });
    }
}
