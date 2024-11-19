import request from "supertest";
import app from "../../../app";

describe("User Routes", () => {
  it("should create a user", async () => {
    const res = await request(app)
      .post("/users")
      .send({ name: "John Doe", email: "john.doe@example.com" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("John Doe");
  });

  it("should validate user creation", async () => {
    const res = await request(app)
      .post("/users")
      .send({ email: "invalid-email" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  it("should return all users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a user by ID", async () => {
    const createRes = await request(app)
      .post("/users")
      .send({ name: "Jane Doe", email: "jane.doe@example.com" });

    const userId = createRes.body.id;

    const getRes = await request(app).get(`/users/${userId}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.name).toBe("Jane Doe");
  });

  it("should delete a user by ID", async () => {
    const createRes = await request(app)
      .post("/users")
      .send({ name: "John Doe", email: "john.doe@example.com" });

    const userId = createRes.body.id;

    const deleteRes = await request(app).delete(`/users/${userId}`);
    expect(deleteRes.status).toBe(204);

    const getRes = await request(app).get(`/users/${userId}`);
    expect(getRes.status).toBe(404);
  });
});
