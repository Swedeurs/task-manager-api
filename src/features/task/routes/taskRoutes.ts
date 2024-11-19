/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import * as TaskService from "../services/taskService";
import { validateUpdateTask } from "../validation/taskValidation";
import router from "../../user/routes/userRoutes";

router.patch(
  "/:id",
  validateUpdateTask,
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const updatedTask = await TaskService.updateTask(req.params.id, req.body);
      if (!updatedTask) {
        res.status(404).json({ error: "Task not found" });
        return;
      }
      res.json(updatedTask);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the task" });
    }
  },
);

router.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const success = await TaskService.deleteTask(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Task not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the task" });
    }
  },
);

export default router;
