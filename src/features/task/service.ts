import { createTaskLogic } from "./logic";
import { TaskRepository } from "./repository";

export const createTaskService = (repository: TaskRepository) => {
  const logic = createTaskLogic(repository);

  return {
    getAllTasks: logic.getAllTasks,
    getTask: logic.getTaskById,
    createTask: logic.createTask,
    updateTask: logic.updateTask,
    removeTask: logic.deleteTask,
  };
};

export type TaskService = ReturnType<typeof createTaskService>;
