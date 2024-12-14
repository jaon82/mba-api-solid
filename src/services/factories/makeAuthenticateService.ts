import { PrismaUsersRepository } from "@/repositories/prisma/UsersRepository";
import AuthenticateService from "../authenticateService";

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);
  return authenticateService;
}
