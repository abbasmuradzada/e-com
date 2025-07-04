import { z } from 'zod';

export const createStripePaymentIntentSchema = z.object({
    orderId: z.string().min(1),
});

export type CreateStripePaymentIntentDto = z.infer<typeof createStripePaymentIntentSchema>;
