import express from "express";
import { UserService } from "./service";
import { ZodError } from "zod";

export const createUserRouter = (service: UserService) => {
  const router = express.Router();

  router.get("/", async (_req, res) => {
    const users = await service.getAllUsers();
    res.status(200).json(users);
  });

  router.get("/:id", async (req, res) => {
    const user = await service.getUserById(req.params.id);
    res.status(200).json(user);
  });

  router.post("/", async (req, res) => {
    try {
      const user = await service.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

  router.patch("/:id", async (req, res) => {
    const updatedUser = await service.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  });

  router.delete("/:id", async (req, res) => {
    const deletedUser = await service.deleteUser(req.params.id);
    res.status(200).json(deletedUser);
  });

  return router;
};
