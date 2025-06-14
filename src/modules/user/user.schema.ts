import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    passwordHash: z.string().min(6),
    name: z.string().optional(),
    googleId: z.string().optional(),
    isEmailVerified: z.boolean().optional(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const googleProfileSchema = z.object({
    email: z.string().email(),
    name: z.string().nullable().optional(),
});

export type RegisterSchemaDto = z.infer<typeof registerSchema>;
export type LoginSchemaDto = z.infer<typeof loginSchema>;
export type GoogleProfileSchemaDto = z.infer<typeof googleProfileSchema>;

export const validateRegisterInput = (input: RegisterSchemaDto) => registerSchema.parse(input);
export const validateLoginInput = (input: LoginSchemaDto) => loginSchema.parse(input);
export const validateGoogleProfileInput = (input: GoogleProfileSchemaDto) =>
    googleProfileSchema.parse(input);
