import request from "supertest";
import { initApp } from "./app/init-app";
import { createTaskRepository } from "./features/task/repository";

describe("Task Routes", () => {
  const app = initApp();

  beforeEach(async () => {
    const taskRepo = createTaskRepository();
    await taskRepo.clear();
  });

  it("should create a task", async () => {
    const response = await request(app).post("/api/v1/tasks").send({
      title: "Test Task",
      userId: "123e4567-e89b-12d3-a456-426614174000",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test Task");
  });

  it("should fetch all tasks", async () => {
    await request(app).post("/api/v1/tasks").send({
      title: "Task 1",
      userId: "123e4567-e89b-12d3-a456-426614174000",
    });

    await request(app).post("/api/v1/tasks").send({
      title: "Task 2",
      userId: "123e4567-e89b-12d3-a456-426614174000",
    });

    const response = await request(app).get("/api/v1/tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(3);
  });

  it("should fetch a task by ID", async () => {
    const taskResponse = await request(app).post("/api/v1/tasks").send({
      title: "Find Me",
      userId: "123e4567-e89b-12d3-a456-426614174000",
    });

    const response = await request(app).get(
      `/api/v1/tasks/${taskResponse.body.id}`,
    );
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Find Me");
  });

  it("should return 404 for a non-existent task ID", async () => {
    const response = await request(app).get("/api/v1/tasks/non-existent-id");
    expect(response.status).toBe(404);
  });

  it("should update a task", async () => {
    const taskResponse = await request(app).post("/api/v1/tasks").send({
      title: "Old Title",
      userId: "123e4567-e89b-12d3-a456-426614174000",
    });

    const response = await request(app)
      .patch(`/api/v1/tasks/${taskResponse.body.id}`)
      .send({ title: "New Title" });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("New Title");
  });

  it("should return 404 when updating a non-existent task", async () => {
    const response = await request(app)
      .patch("/api/v1/tasks/non-existent-id")
      .send({ title: "New Title" });

    expect(response.status).toBe(404);
  });

  it("should delete a task", async () => {
    const taskResponse = await request(app).post("/api/v1/tasks").send({
      title: "Task to Delete",
      userId: "123e4567-e89b-12d3-a456-426614174000",
    });

    const deleteResponse = await request(app).delete(
      `/api/v1/tasks/${taskResponse.body.id}`,
    );
    expect(deleteResponse.status).toBe(200);

    const fetchResponse = await request(app).get(
      `/api/v1/tasks/${taskResponse.body.id}`,
    );
    expect(fetchResponse.status).toBe(404);
  });

  it("should return 404 when deleting a non-existent task", async () => {
    const response = await request(app).delete("/api/v1/tasks/non-existent-id");
    expect(response.status).toBe(404);
  });
});
