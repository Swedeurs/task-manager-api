import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const UserSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;
