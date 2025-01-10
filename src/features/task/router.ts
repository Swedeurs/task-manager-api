/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import * as taskService from "./service";

import router from "../user/routes/userRoutes";

router.patch(
  "/:id",
  validateUpdateTask, //ska bort
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const updatedTask = await taskService.updateTask(req.params.id, req.body);
      if (!updatedTask) {
        res.sendStatus(404);
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
      await taskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the task" });
    }
  },
);

export default router;
