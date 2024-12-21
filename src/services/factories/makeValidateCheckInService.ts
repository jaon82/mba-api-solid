import { PrismaCheckInsRepository } from "@/repositories/prisma/CheckInsRepository";
import { ValidateCheckInService } from "../validateCheckInService";

export function makeValidateCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const service = new ValidateCheckInService(checkInsRepository);
  return service;
}
