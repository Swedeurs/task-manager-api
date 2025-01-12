import { v4 as uuidv4 } from "uuid";
import { createTaskLogic } from "./logic";
import { createTaskRepository } from "./repository";
import { TaskCreate } from "./validation";

describe("Task Logic - Unit Tests", () => {
  let logic: ReturnType<typeof createTaskLogic>;
  let repo: ReturnType<typeof createTaskRepository>;

  beforeEach(() => {
    repo = createTaskRepository();
    logic = createTaskLogic(repo);
  });

  it("should create a task", async () => {
    const taskData: TaskCreate = { title: "Task 1", userId: uuidv4(), status: "pending" };
    const task = await logic.createTask(taskData);

    expect(task).toHaveProperty("id");
    expect(task.title).toBe(taskData.title);
    expect(task.status).toBe("pending");
  });

  it("should fetch all tasks", async () => {
    const userId = uuidv4();
    await logic.createTask({ title: "Task 1", userId, status: "pending" });
    await logic.createTask({ title: "Task 2", userId, status: "pending" });

    const tasks = await logic.getAllTasks();

    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe("Task 1");
    expect(tasks[1].title).toBe("Task 2");
  });

  it("should fetch a task by ID", async () => {
    const taskData: TaskCreate = { title: "Find Me", userId: uuidv4(), status: "pending" };
    const createdTask = await logic.createTask(taskData);

    const task = await logic.getTaskById(createdTask.id);
    expect(task).toBeDefined();
    expect(task?.title).toBe("Find Me");
  });

  it("should return undefined for a non-existent task ID", async () => {
    const nonExistentId = uuidv4();

    const task = await logic.getTaskById(nonExistentId);

    expect(task).toBeUndefined();
  });

  it("should update a task", async () => {
    const taskData: TaskCreate = { title: "Old Title", userId: uuidv4(), status: "pending" };
    const createdTask = await logic.createTask(taskData);

    const updatedTask = await logic.updateTask(createdTask.id, { title: "New Title" });

    expect(updatedTask).toBeDefined();
    expect(updatedTask?.title).toBe("New Title");
  });

  it("should return undefined when updating a non-existent task", async () => {
    const nonExistentId = uuidv4();

    const updatedTask = await logic.updateTask(nonExistentId, { title: "New Title" });

    expect(updatedTask).toBeUndefined();
  });

  it("should delete a task", async () => {
    const taskData: TaskCreate = { title: "Task to Delete", userId: uuidv4(), status: "pending" };
    const createdTask = await logic.createTask(taskData);

    const deletedTask = await logic.deleteTask(createdTask.id);
    const tasks = await logic.getAllTasks();

    expect(deletedTask).toBeDefined();
    expect(tasks).toHaveLength(0);
  });

  it("should return undefined when deleting a non-existent task", async () => {
    const nonExistentId = uuidv4();

    const deletedTask = await logic.deleteTask(nonExistentId);

    expect(deletedTask).toBeUndefined();
  });
});
