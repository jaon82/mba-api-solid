import { PrismaUsersRepository } from "@/repositories/prisma/UsersRepository";
import { RegisterService } from "../registerService";

export function makeRegisterService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerService = new RegisterService(prismaUsersRepository);
  return registerService;
}
