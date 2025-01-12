import { Task, TaskCreate, TaskUpdate, TaskCreateSchema, TaskUpdateSchema } from "./validation";
import { TaskRepository } from "./repository";

export const createTaskLogic = (repository: TaskRepository) => ({
  getAllTasks: async (): Promise<Task[]> => repository.getAll(),

  getTaskById: async (id: string): Promise<Task | undefined> => {
    return repository.getById(id);
  },

  createTask: async (data: TaskCreate): Promise<Task> => {
    const validatedData = TaskCreateSchema.parse(data);
    const task: Task = { id: crypto.randomUUID(), ...validatedData };
    return repository.create(task);
  },

  updateTask: async (id: string, data: TaskUpdate): Promise<Task | undefined> => {
    const validatedData = TaskUpdateSchema.parse(data);
    return repository.update(id, validatedData);
  },

  deleteTask: async (id: string): Promise<Task | undefined> => {
    return repository.remove(id);
  },

  clearTasks: async (): Promise<void> => repository.clear(),
});

export type TaskLogic = ReturnType<typeof createTaskLogic>;
