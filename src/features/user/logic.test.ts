import * as userLogic from "./logic";


describe("User Logic", () => {
  beforeEach(() => {
    userLogic.resetUsers();
  });

  it("should create a user", async () => {
    const user = await userLogic.createUser({
      name: "John Doe",
      email: "john.doe@example.com",
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john.doe@example.com");
  });

  it("should fetch all users", async () => {
    await userLogic.createUser({ name: "User One", email: "user.one@example.com" });
    await userLogic.createUser({ name: "User Two", email: "user.two@example.com" });

    const users = await userLogic.getAllUsers();
    expect(users.length).toBe(2);
    expect(users[0].name).toBe("User One");
    expect(users[1].name).toBe("User Two");
  });

  it("should fetch a user by ID", async () => {
    const user = await userLogic.createUser({ name: "Find Me", email: "find.me@example.com" });

    const foundUser = await userLogic.getUserById(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser?.name).toBe("Find Me");
  });

  it("should delete a user", async () => {
    const user = await userLogic.createUser({ name: "Delete Me", email: "delete.me@example.com" });

    const success = await userLogic.deleteUser(user.id);
    expect(success).toBe(true);

    const users = await userLogic.getAllUsers();
    expect(users.length).toBe(0);
  });

  it("should return false for deleting a non-existent user", async () => {
    const success = await userLogic.deleteUser("non-existent-id");
    expect(success).toBe(false);
  });
});
