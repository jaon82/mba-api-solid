import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { CreateGymService } from "../createGymService";

export function makeCreateGymService() {
  const gymsRepository = new PrismaGymsRepository();
  const service = new CreateGymService(gymsRepository);
  return service;
}
