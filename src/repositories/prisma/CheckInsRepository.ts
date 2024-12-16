import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ICheckInsRepository } from "../ICheckInsRepository";

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });
    return checkIn;
  }
}
