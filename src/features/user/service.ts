import { v4 as uuidv4 } from "uuid";
import { User, UserSchema } from "./validations";
import { UserRepository } from "./repository";

export const createUserService = (repo: UserRepository) => ({
  getAllUsers: async () => repo.getAll(),

  getUserById: async (id: string) => {
    const user = await repo.getById(id);
    return user || undefined;
  },

  createUser: async (data: Omit<User, "id">) => {
    const userData = UserSchema.omit({ id: true }).parse(data);
    const newUser = { id: uuidv4(), ...userData };
    return repo.create(newUser);
  },
  updateUser: async (id: string, data: Partial<User>) => {
    const updatedUser = await repo.update(id, data);
    return updatedUser || undefined;
  },

  deleteUser: async (id: string) => {
    const deletedUser = await repo.remove(id);
    return deletedUser || undefined;
  },
});

export type UserService = ReturnType<typeof createUserService>;
