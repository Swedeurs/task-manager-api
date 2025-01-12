import { UserRepository } from "./repository";
import { createUserLogic } from "./logic";
import { User } from "./validations";

export const createUserService = (repo: UserRepository) => {
  const logic = createUserLogic();

  return {
    getAllUsers: async () => repo.getAll(),

    getUserById: async (id: string) => repo.getById(id),

    createUser: async (data: Omit<User, "id">) => {
      const validatedData = logic.validateUserCreate(data);
      const newUser = logic.generateUser(validatedData);
      return repo.create(newUser);
    },

    updateUser: async (id: string, data: Partial<User>) => {
      const validatedData = logic.validateUserUpdate(data);
      return repo.update(id, validatedData);
    },

    deleteUser: async (id: string) => repo.remove(id),
  };
};

export type UserService = ReturnType<typeof createUserService>;
