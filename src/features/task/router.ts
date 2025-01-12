import express from "express";
import { TaskService } from "./service";

export const createTaskRouter = (service: TaskService) => {
  const router = express.Router();

  router.get("/", async (_req, res) => {
    const tasks = await service.getAllTasks();
    res.status(200).json(tasks);
  });

  router.get("/:id", async (req, res) => {
    const task = await service.getTask(req.params.id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(task);
  });

  router.post("/", async (req, res) => {
    const task = await service.createTask(req.body);
    res.status(201).json(task);
  });

  router.patch("/:id", async (req, res) => {
    const updatedTask = await service.updateTask(req.params.id, req.body);
    if (!updatedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(updatedTask);
  });

  router.delete("/:id", async (req, res) => {
    const deletedTask = await service.removeTask(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(deletedTask);
  });

  return router;
};
