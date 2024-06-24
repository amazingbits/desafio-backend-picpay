import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { PrismaUserTypeRepository } from "../../repositories/prisma/prisma-user-type-repository";
import { RegisterUserService } from "../register-user-service";

export const registerUserFactory = () => {
  const userRepository = new PrismaUserRepository();
  const userTypeRepository = new PrismaUserTypeRepository();
  const registerUserService = new RegisterUserService(userRepository, userTypeRepository);

  return registerUserService;
};
