import { User, UserCreate, UserCreateSchema } from "./validations";
import { UserRepository } from "./repository";

export const createUserLogic = (repository: UserRepository) => ({
  getAllUsers: async (): Promise<User[]> => repository.getAll(),

  getUserById: async (id: string): Promise<User | undefined> =>
    repository.getById(id),

  createUser: async (data: UserCreate): Promise<User> => {
    const validatedData = UserCreateSchema.parse(data);
    const user: User = { id: crypto.randomUUID(), ...validatedData };
    return repository.create(user);
  },

  updateUser: async (
    id: string,
    data: Partial<User>
  ): Promise<User | undefined> => {
    return repository.update(id, data);
  },

  deleteUser: async (id: string): Promise<User | undefined> => {
    return repository.remove(id);
  },

});

export type UserLogic = ReturnType<typeof createUserLogic>;
