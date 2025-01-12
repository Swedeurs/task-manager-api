import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
});

export const UserCreateSchema = UserSchema.omit({ id: true });
export type User = z.infer<typeof UserSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
