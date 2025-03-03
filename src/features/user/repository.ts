import { User } from "./validations";

export const createUserRepository = () => {
  const userDatabase: User[] = [];

  return {
    getAll: async (): Promise<User[]> => userDatabase,

    getById: async (id: string): Promise<User | undefined> =>
      userDatabase.find((user) => user.id === id),

    create: async (user: User): Promise<User> => {
      userDatabase.push(user);
      return user;
    },

    update: async (
      id: string,
      data: Partial<User>,
    ): Promise<User | undefined> => {
      const userIndex = userDatabase.findIndex((user) => user.id === id);
      if (userIndex === -1) return undefined;
      userDatabase[userIndex] = { ...userDatabase[userIndex], ...data };
      return userDatabase[userIndex];
    },

    remove: async (id: string): Promise<User | undefined> => {
      const userIndex = userDatabase.findIndex((user) => user.id === id);
      if (userIndex === -1) return undefined;
      const [removedUser] = userDatabase.splice(userIndex, 1);
      return removedUser;
    },
  };
};

export type UserRepository = ReturnType<typeof createUserRepository>;
