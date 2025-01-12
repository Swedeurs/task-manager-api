
  import { createTaskRepository, createTaskRouter, createTaskService } from "../features/task";

  import { createApp } from "./app";
  
  export const initApp = () => {
    const taskRepository = createTaskRepository();
    const taskService = createTaskService(taskRepository);
    const taskRouter = createTaskRouter(taskService);
  
    const userRepository = createUserRepository();
    const userService = createUserService(userRepository);
    const userRouter = createUserRouter(userService);
  
    return createApp(taskRouter, userRouter);
  };
  