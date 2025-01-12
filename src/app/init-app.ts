import { app } from ".";
import { createTaskRouter } from "../features/task";
import { createUserRouter } from "../features/user";

export const initApp = () => {
  const taskRouter = createTaskRouter();
  const userRouter = createUserRouter();

  return app(taskRouter, userRouter);
};
