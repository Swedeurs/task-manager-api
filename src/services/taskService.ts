import { Task, TaskSchema } from "../models/task";

const tasks: Task[] = [];

export const getAllTasks = async (): Promise<Task[]> => tasks;

export const createTask = async (taskData: Partial<Task>): Promise<Task> => {
  const task = TaskSchema.parse({ ...taskData });
  tasks.push(task);
  return task;
};

export const getTaskById = async (id: string): Promise<Task | undefined> => {
  return tasks.find((task) => task.id === id);
};

export const updateTask = async (
  id: string,
  data: Partial<Task>
): Promise<Task | undefined> => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return undefined;
  tasks[index] = { ...tasks[index], ...data };
  return tasks[index];
};

export const deleteTask = async (id: string): Promise<boolean> => {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};
