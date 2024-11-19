import { TaskSchema } from "../models/task";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const TaskCreateSchema = TaskSchema.omit({ id: true });

const TaskUpdateSchema = TaskSchema.partial();

export const validateCreateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    TaskCreateSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const validateUpdateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    TaskUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
