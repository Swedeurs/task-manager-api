import { app } from ".";
import { createTaskRepository, createTaskService, createTaskRouter } from "../features/task";
import { createUserRepository, createUserService, createUserRouter } from "../features/user";

export const initApp = () => {
  const taskRepository = createTaskRepository();
  const taskService = createTaskService(taskRepository);
  const taskRouter = createTaskRouter(taskService);

  const userRepository = createUserRepository();
  const userService = createUserService(userRepository);
  const userRouter = createUserRouter(userService);

  return app(taskRouter, userRouter);
};

