import { PrismaCheckInsRepository } from "@/repositories/prisma/CheckInsRepository";
import { FetchUserCheckInsHistoryService } from "../fetchUserCheckInsHistoryService";

export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new FetchUserCheckInsHistoryService(checkInsRepository);
  return service;
}
