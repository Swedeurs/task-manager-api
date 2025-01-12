import request from "supertest";
import { initApp } from "./app";

describe("User Routes - Integration Tests", () => {
  const USERS_BASE_URL = "/api/v1/users";
  let app: ReturnType<typeof initApp>;

  beforeEach(() => {
    app = initApp();
  });

  it("should create and fetch a user", async () => {
    const createResponse = await request(app)
      .post(USERS_BASE_URL)
      .send({ name: "Jane Doe", email: "jane.doe@example.com" });

    const userId = createResponse.body.id;
    const fetchResponse = await request(app).get(`${USERS_BASE_URL}/${userId}`);

    expect(fetchResponse.body.name).toBe("Jane Doe");
  });

  it("should handle validation errors", async () => {
    const response = await request(app)
      .post(USERS_BASE_URL)
      .send({ email: "invalid-email" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});
