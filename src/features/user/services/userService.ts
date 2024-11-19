import { User, UserSchema } from "../models/user";

const users: User[] = [];

export const getAllUsers = async (): Promise<User[]> => users;

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const user = UserSchema.parse({ ...userData });
  users.push(user);
  return user;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  return users.find((user) => user.id === id);
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};
