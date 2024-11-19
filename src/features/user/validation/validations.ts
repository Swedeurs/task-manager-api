import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { UserSchema } from "../models/user";

const UserCreateSchema = UserSchema.omit({ id: true });

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    UserCreateSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
