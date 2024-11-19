/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from "express";
import * as UserService from "../services/userService";
import { validateCreateUser } from "../validation/validations";

const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

router.post(
  "/",
  validateCreateUser,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  },
);

router.get(
  "/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  },
);

router.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const success = await UserService.deleteUser(req.params.id);
      if (!success) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  },
);

export default router;
