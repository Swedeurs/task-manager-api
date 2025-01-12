import { app } from ".";
import { createTaskRouter, createUserRouter } from "../features";

export const initApp = () => {
  const taskRouter = createTaskRouter();
  const userRouter = createUserRouter();

  return app(taskRouter, userRouter);
};
