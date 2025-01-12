
import express, { Request, Response, Router } from "express";
import { createTaskRepository, createTaskRouter, createTaskService } from "../features/task";

export const createApp = (tasksRouter: Router, usersRouter: Router) => {
  const app = express();

  app.use(express.json());

  app.get("/status", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  app.use("/api/v1/tasks", tasksRouter);


  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: any, req: Request, res: Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
};



const tasksRouter = createTaskRouter(
  createTaskService(createTaskRepository())
);
const usersRouter = createUserRouter(
  createUserService(createUserRepository())
);

export const app = createApp(tasksRouter, usersRouter);
