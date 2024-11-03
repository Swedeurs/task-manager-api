import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const TaskSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
  userId: z.string().uuid(),
});

export type Task = z.infer<typeof TaskSchema>;
