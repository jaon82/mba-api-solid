import { PrismaUsersRepository } from "@/repositories/prisma/UsersRepository";
import GetUserProfileService from "../getUserProfileService";

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository();
  const service = new GetUserProfileService(usersRepository);
  return service;
}
