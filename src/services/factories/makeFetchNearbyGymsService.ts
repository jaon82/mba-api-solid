import { PrismaGymsRepository } from "@/repositories/prisma/PrismaGymsRepository";
import { FetchNearbyGymsService } from "../fetchNearbyGymsService";

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository();
  const service = new FetchNearbyGymsService(gymsRepository);
  return service;
}
