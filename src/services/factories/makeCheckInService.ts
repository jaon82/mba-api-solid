import { PrismaCheckInsRepository } from "@/repositories/prisma/CheckInsRepository";
import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import CheckInService from "../checkInService";

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  const service = new CheckInService(checkInsRepository, gymsRepository);
  return service;
}
