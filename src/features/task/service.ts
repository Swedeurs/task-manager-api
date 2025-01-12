import { v4 as uuidv4 } from "uuid";
import { TaskCreateSchema, TaskUpdateSchema } from "./validation";
import { TaskRepository } from "./repository";

export const createTaskService = (repo: TaskRepository) => ({
  getAllTasks: async () => repo.getAll(),

  getTask: async (id: string) => {
    const task = await repo.getById(id);
    return task || undefined;
  },

  createTask: async (data: typeof TaskCreateSchema._type) => {
    const taskData = TaskCreateSchema.parse(data);
    const exists = (await repo.getAll()).some(task => task.title === taskData.title);


    if (exists) return null;

    const newTask = { id: uuidv4(), ...taskData };
    return repo.create(newTask);
  },

  updateTask: async (id: string, data: typeof TaskUpdateSchema._type) => {
    const updateData = TaskUpdateSchema.parse(data);
    const updatedTask = await repo.update(id, updateData);


    return updatedTask || undefined;
  },

  removeTask: async (id: string) => {
    const removedTask = await repo.remove(id);

    return removedTask || undefined;
  },
});

export type TaskService = ReturnType<typeof createTaskService>;
