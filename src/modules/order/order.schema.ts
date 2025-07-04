import { z } from 'zod';

export const createOrderSchema = z.object({
    userId: z.string().min(1),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;
