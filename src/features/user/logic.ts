import { User, UserCreate, UserCreateSchema, UserSchema } from "./validations";

export const createUserLogic = () => ({
  validateUserCreate: (data: UserCreate): UserCreate => {
    return UserCreateSchema.parse(data);
  },

  validateUserUpdate: (data: Partial<User>): Partial<User> => {
    return UserSchema.partial().parse(data);
  },

  generateUser: (data: UserCreate): User => {
    return { id: crypto.randomUUID(), ...data };
  },
});

export type UserLogic = ReturnType<typeof createUserLogic>;
