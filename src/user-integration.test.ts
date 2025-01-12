import request from "supertest";
import { initApp } from "./app";
import { createUserRepository } from "./features/user";

describe("User Routes", () => {
  const USERS_BASE_URL = "/api/v1/users";

  let app: ReturnType<typeof initApp>;

  beforeEach(async () => {
    app = initApp();
    const userRepo = createUserRepository();
    await userRepo.clear();
  });
  

  it("should create a user", async () => {
    const response = await request(app)
      .post(USERS_BASE_URL)
      .send({ name: "John Doe", email: "john.doe@example.com" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("John Doe");
    expect(response.body.email).toBe("john.doe@example.com");
  });

  it("should validate user creation", async () => {
    const response = await request(app)
      .post(USERS_BASE_URL)
      .send({ email: "invalid-email" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  it("should return all users", async () => {
    await request(app)
      .post(USERS_BASE_URL)
      .send({ name: "User One", email: "user.one@example.com" });

    await request(app)
      .post(USERS_BASE_URL)
      .send({ name: "User Two", email: "user.two@example.com" });

    const response = await request(app).get(USERS_BASE_URL);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  it("should get a user by ID", async () => {
    const createResponse = await request(app)
      .post(USERS_BASE_URL)
      .send({ name: "Jane Doe", email: "jane.doe@example.com" });

    const userId = createResponse.body.id;

    const getResponse = await request(app).get(`${USERS_BASE_URL}/${userId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe("Jane Doe");
    expect(getResponse.body.email).toBe("jane.doe@example.com");
  });

  it("should delete a user by ID", async () => {
    const createResponse = await request(app)
      .post(USERS_BASE_URL)
      .send({ name: "John Doe", email: "john.doe@example.com" });

    const userId = createResponse.body.id;

    const deleteResponse = await request(app).delete(`${USERS_BASE_URL}/${userId}`);
    expect(deleteResponse.status).toBe(200);

    const getResponse = await request(app).get(`${USERS_BASE_URL}/${userId}`);
    expect(getResponse.status).toBe(200);
  });
});
