import { z } from "zod";


export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
  userId: z.string().uuid(),
});


export const TaskCreateSchema = TaskSchema.omit({ id: true });
export const TaskUpdateSchema = TaskSchema.partial();

export type Task = z.infer<typeof TaskSchema>;
export type TaskCreate = z.infer<typeof TaskCreateSchema>;
export type TaskUpdate = z.infer<typeof TaskUpdateSchema>;
