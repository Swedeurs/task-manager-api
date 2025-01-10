import request from "supertest";
import app from "./app";

describe("Task Routes", () => {
  it("should create a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
        userId: "123e4567-e89b-12d3-a456-426614174000",
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test Task");
  });

  it("should validate task creation", async () => {
    const res = await request(app).post("/tasks").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  it("should update a task", async () => {
    const createRes = await request(app)
      .post("/tasks")
      .send({
        title: "Task to Update",
        userId: "123e4567-e89b-12d3-a456-426614174000",
      });

    const updatedTitle = "Updated Task Title";

    const updateRes = await request(app)
      .patch(`/tasks/${createRes.body.id}`)
      .send({ title: updatedTitle });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.title).toBe(updatedTitle);
  });

  it("should return 404 for non-existent task update", async () => {
    const res = await request(app)
      .patch("/tasks/non-existent-id")
      .send({ title: "Test" });
    expect(res.status).toBe(404);
  });

  it("should delete a task", async () => {
    const createRes = await request(app)
      .post("/tasks")
      .send({
        title: "Task to Delete",
        userId: "123e4567-e89b-12d3-a456-426614174000",
      });

    const taskId = createRes.body.id;

    const deleteRes = await request(app).delete(`/tasks/${taskId}`);
    expect(deleteRes.status).toBe(204);

    const getRes = await request(app).get(`/tasks/${taskId}`);
    expect(getRes.status).toBe(404);
  });
});
