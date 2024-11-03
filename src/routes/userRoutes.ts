import express from "express";
import * as UserService from "../services/userRoutes";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await UserService.getAllUsers();
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await UserService.createUser(req.body);
  res.status(201).json(user);
});

router.get("/:id", async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const success = await UserService.deleteUser(req.params.id);
  if (!success) return res.status(404).json({ error: "User not found" });
  res.status(204).send();
});

export default router;
