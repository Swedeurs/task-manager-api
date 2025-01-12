import { app } from ".";
import {
  createTaskRepository,
  createTaskService,
  createTaskRouter,
  createUserRepository,
  createUserService,
  createUserRouter,
} from "../features";

export const initApp = () => {
  const taskRouter = (() => {
    const repository = createTaskRepository();
    const service = createTaskService(repository);
    return createTaskRouter(service);
  })();

  const userRouter = (() => {
    const repository = createUserRepository();
    const service = createUserService(repository);
    return createUserRouter(service);
  })();

  return app(taskRouter, userRouter);
};
