import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    passwordHash: z.string().min(6),
    name: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type RegisterSchemaDto = z.infer<typeof registerSchema>;
export type LoginSchemaDto = z.infer<typeof loginSchema>;

export const validateRegisterInput = (input: RegisterSchemaDto) => registerSchema.parse(input);
export const validateLoginInput = (input: LoginSchemaDto) => loginSchema.parse(input);
