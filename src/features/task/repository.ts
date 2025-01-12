import { Task } from "./validation";

const taskDatabase: Task[] = [];

export const createTaskRepository = () => ({
  getAll: async (): Promise<Task[]> => taskDatabase,
  getById: async (id: string): Promise<Task | undefined> =>
    taskDatabase.find(task => task.id === id),
  create: async (task: Task): Promise<Task> => {
    taskDatabase.push(task);
    return task;
  },
  update: async (id: string, data: Partial<Task>): Promise<Task | undefined> => {
    const taskIndex = taskDatabase.findIndex(task => task.id === id);
    if (taskIndex === -1) return undefined;
    taskDatabase[taskIndex] = { ...taskDatabase[taskIndex], ...data };
    return taskDatabase[taskIndex];
  },
  remove: async (id: string): Promise<Task | undefined> => {
    const taskIndex = taskDatabase.findIndex(task => task.id === id);
    if (taskIndex === -1) return undefined;
    const [removedTask] = taskDatabase.splice(taskIndex, 1);
    return removedTask;
  },
  clear: async (): Promise<void> => {
    taskDatabase.length = 0;
  },
});

export type TaskRepository = ReturnType<typeof createTaskRepository>;
