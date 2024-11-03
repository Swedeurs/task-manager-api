import request from "supertest";
import app from "../app";

describe("Task Routes", () => {
  it("should create a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task", userId: "test-user-id" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should return all tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
