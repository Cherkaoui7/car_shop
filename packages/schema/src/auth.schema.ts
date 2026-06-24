// packages/schema/src/auth.schema.ts
import { z } from 'zod';

export const UserRoleSchema = z.enum(['CUSTOMER', 'SALES_REP', 'ADMIN']);

export const LoginCredentialsSchema = z.object({
  email: z.string().email("Invalid email format provided."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const RegisterUserSchema = LoginCredentialsSchema.extend({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  phone: z.string().optional(),
});

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
