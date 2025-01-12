import { createUserLogic } from "./logic";
import { createUserRepository } from "./repository";
import { v4 as uuidv4 } from "uuid";

describe("User Logic - Unit Tests", () => {
  let logic: ReturnType<typeof createUserLogic>;
  let repository: ReturnType<typeof createUserRepository>;

  beforeEach(() => {
    repository = createUserRepository();
    logic = createUserLogic(repository);
  });

  it("should create a user", async () => {
    const userData = { name: "John Doe", email: "john.doe@example.com" };
    const user = await logic.createUser(userData);

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john.doe@example.com");
  });

  it("should fetch all users", async () => {
    await logic.createUser({ name: "User One", email: "user.one@example.com" });
    await logic.createUser({ name: "User Two", email: "user.two@example.com" });

    const users = await logic.getAllUsers();
    expect(users).toHaveLength(2);
    expect(users[0].name).toBe("User One");
    expect(users[1].name).toBe("User Two");
  });

  it("should fetch a user by ID", async () => {
    const userData = { name: "Find Me", email: "find.me@example.com" };
    const createdUser = await logic.createUser(userData);

    const fetchedUser = await logic.getUserById(createdUser.id);
    expect(fetchedUser).toBeDefined();
    expect(fetchedUser?.id).toBe(createdUser.id);
  });

  it("should delete a user", async () => {
    const userData = { name: "Delete Me", email: "delete.me@example.com" };
    const createdUser = await logic.createUser(userData);

    const deletedUser = await logic.deleteUser(createdUser.id);
    const allUsers = await logic.getAllUsers();

    expect(deletedUser?.id).toBe(createdUser.id);
    expect(allUsers).toHaveLength(0);
  });

  it("should return undefined when deleting a non-existent user", async () => {
    const deletedUser = await logic.deleteUser(uuidv4());
    expect(deletedUser).toBeUndefined();
  });
});
