import { createUserLogic } from "./logic";
import { createUserRepository } from "./repository";
import { UserCreate } from "./validations";

describe("User Logic - Unit Tests", () => {
  let logic: ReturnType<typeof createUserLogic>;
  let repository: ReturnType<typeof createUserRepository>;

  beforeEach(() => {
    repository = createUserRepository();
    logic = createUserLogic();
  });

  it("should validate and create a user", () => {
    const userData: UserCreate = {
      name: "John Doe",
      email: "john.doe@example.com",
    };
    const validatedData = logic.validateUserCreate(userData);
    const user = logic.generateUser(validatedData);

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john.doe@example.com");
  });

  it("should add a user to the repository", async () => {
    const userData: UserCreate = {
      name: "User One",
      email: "user.one@example.com",
    };
    const validatedData = logic.validateUserCreate(userData);
    const user = logic.generateUser(validatedData);

    await repository.create(user);

    const allUsers = await repository.getAll();
    expect(allUsers).toHaveLength(1);
    expect(allUsers[0].name).toBe("User One");
  });

  it("should fetch all users from the repository", async () => {
    const userData1: UserCreate = {
      name: "User One",
      email: "user.one@example.com",
    };
    const userData2: UserCreate = {
      name: "User Two",
      email: "user.two@example.com",
    };

    await repository.create(
      logic.generateUser(logic.validateUserCreate(userData1)),
    );
    await repository.create(
      logic.generateUser(logic.validateUserCreate(userData2)),
    );

    const allUsers = await repository.getAll();
    expect(allUsers).toHaveLength(2);
    expect(allUsers[0].name).toBe("User One");
    expect(allUsers[1].name).toBe("User Two");
  });

  it("should fetch a user by ID from the repository", async () => {
    const userData: UserCreate = {
      name: "Find Me",
      email: "find.me@example.com",
    };
    const user = logic.generateUser(logic.validateUserCreate(userData));

    await repository.create(user);

    const fetchedUser = await repository.getById(user.id);
    expect(fetchedUser).toBeDefined();
    expect(fetchedUser?.id).toBe(user.id);
    expect(fetchedUser?.name).toBe("Find Me");
  });

  it("should delete a user from the repository", async () => {
    const userData: UserCreate = {
      name: "Delete Me",
      email: "delete.me@example.com",
    };
    const user = logic.generateUser(logic.validateUserCreate(userData));

    await repository.create(user);

    const deletedUser = await repository.remove(user.id);
    const allUsers = await repository.getAll();

    expect(deletedUser?.id).toBe(user.id);
    expect(allUsers).toHaveLength(0);
  });

  it("should return undefined when deleting a non-existent user from the repository", async () => {
    const deletedUser = await repository.remove("non-existent-id");
    expect(deletedUser).toBeUndefined();
  });
});
