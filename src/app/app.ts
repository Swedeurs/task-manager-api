import express, { Router } from "express";

export const app = (tasksRouter: Router, usersRouter: Router) => {
  const app = express();

  app.use(express.json());

  app.get("/status", (req, res) => {
    res.status(200).json({ status: "OK" });
  });

  app.use("/api/v1/tasks", tasksRouter);
  app.use("/api/v1/users", usersRouter);
  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
};
