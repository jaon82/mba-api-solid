import { PrismaCheckInsRepository } from "@/repositories/prisma/CheckInsRepository";
import { GetUserMetricsService } from "../getUserMetricsService";

export function makeGetUserMetricsService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new GetUserMetricsService(checkInsRepository);
  return service;
}
