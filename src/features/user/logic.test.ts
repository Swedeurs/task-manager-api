import { v4 as uuidv4 } from "uuid";
import { createUserService } from "./service";
import { createUserRepository } from "./repository";

describe("User Service - Unit Tests", () => {
  let service: ReturnType<typeof createUserService>;
  let repo: ReturnType<typeof createUserRepository>;

  beforeEach(async () => {
    repo = createUserRepository();
    service = createUserService(repo);
    await repo.clear(); 
  });

  it("should create a user", async () => {
    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
    };

    const user = await service.createUser(userData);

    expect(user).not.toBeNull();
    expect(user).toHaveProperty("id");
    expect(user.id).toMatch(/^[0-9a-fA-F-]{36}$/);
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  it("should fetch all users", async () => {
    await service.createUser({ name: "User One", email: "user.one@example.com" });
    await service.createUser({ name: "User Two", email: "user.two@example.com" });

    const users = await service.getAllUsers();

    expect(users.length).toBe(2);
    expect(users[0].name).toBe("User One");
    expect(users[0].email).toBe("user.one@example.com");
    expect(users[1].name).toBe("User Two");
    expect(users[1].email).toBe("user.two@example.com");
  });

  it("should fetch a user by ID", async () => {
    const userData = {
      name: "Find Me",
      email: "find.me@example.com",
    };

    const createdUser = await service.createUser(userData);

    const user = await service.getUserById(createdUser.id);

    expect(user).toBeDefined();
    expect(user?.id).toBe(createdUser.id);
    expect(user?.name).toBe(userData.name);
    expect(user?.email).toBe(userData.email);
  });

  it("should delete a user", async () => {
    const userData = {
      name: "Delete Me",
      email: "delete.me@example.com",
    };

    const createdUser = await service.createUser(userData);

    const deletedUser = await service.deleteUser(createdUser.id);

    const users = await service.getAllUsers();

    expect(deletedUser).toBeDefined();
    expect(deletedUser?.id).toBe(createdUser.id);
    expect(users.length).toBe(0);
  });

  it("should return undefined when deleting a non-existent user", async () => {
    const nonExistentId = uuidv4();

    const deletedUser = await service.deleteUser(nonExistentId);

    const users = await service.getAllUsers();

    expect(deletedUser).toBeUndefined();
    expect(users.length).toBe(0); 
  });
});
