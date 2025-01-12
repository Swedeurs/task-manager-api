import { v4 as uuidv4 } from "uuid";
import { createTaskRepository } from "./repository";
import { createTaskService } from "./service";
import { TaskCreate } from "./validation";

describe("Task Service - Unit Tests", () => {
  let service: ReturnType<typeof createTaskService>;
  let repo: ReturnType<typeof createTaskRepository>;

  beforeEach(async () => {
    repo = createTaskRepository();
    service = createTaskService(repo);
    await repo.clear();
  });

  it("should create a task", async () => {
    const taskData: TaskCreate = {
      title: "Task 1",
      userId: uuidv4(),
      status: "pending",
    };

    const task = await service.createTask(taskData);

    expect(task).not.toBeNull();
    expect(task).toHaveProperty("id");
    expect(task?.title).toBe(taskData.title);
    expect(task?.status).toBe(taskData.status);
  });

  it("should fetch all tasks", async () => {
    const userId = uuidv4();
    await service.createTask({ title: "Task 1", userId, status: "pending" });
    await service.createTask({ title: "Task 2", userId, status: "pending" });

    const tasks = await service.getAllTasks();

    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toBe("Task 1");
    expect(tasks[1].title).toBe("Task 2");
  });

  it("should fetch a task by ID", async () => {
    const taskData: TaskCreate = {
      title: "Find Me",
      userId: uuidv4(),
      status: "pending",
    };
    const createdTask = await service.createTask(taskData);

    expect(createdTask).not.toBeNull();
    if (createdTask) {
      const task = await service.getTask(createdTask.id);
      expect(task).toBeDefined();
      expect(task?.title).toBe(taskData.title);
    }
  });

  it("should return undefined for a non-existent task ID", async () => {
    const nonExistentId = uuidv4();

    const task = await service.getTask(nonExistentId);

    expect(task).toBeUndefined();
  });

  it("should update a task", async () => {
    const taskData: TaskCreate = {
      title: "Old Title",
      userId: uuidv4(),
      status: "pending",
    };
    const createdTask = await service.createTask(taskData);

    expect(createdTask).not.toBeNull();
    if (createdTask) {
      const updatedTask = await service.updateTask(createdTask.id, {
        title: "New Title",
      });

      expect(updatedTask).toBeDefined();
      expect(updatedTask?.title).toBe("New Title");
    }
  });

  it("should return undefined when updating a non-existent task", async () => {
    const nonExistentId = uuidv4();

    const updatedTask = await service.updateTask(nonExistentId, {
      title: "New Title",
    });

    expect(updatedTask).toBeUndefined();
  });

  it("should delete a task", async () => {
    const taskData: TaskCreate = {
      title: "Task to Delete",
      userId: uuidv4(),
      status: "pending",
    };
    const createdTask = await service.createTask(taskData);

    expect(createdTask).not.toBeNull();
    if (createdTask) {
      const deletedTask = await service.removeTask(createdTask.id);

      const tasks = await service.getAllTasks();

      expect(deletedTask).toBeDefined();
      expect(tasks.length).toBe(0);
    }
  });

  it("should return undefined when deleting a non-existent task", async () => {
    const nonExistentId = uuidv4();

    const deletedTask = await service.removeTask(nonExistentId);

    expect(deletedTask).toBeUndefined();
  });
});
