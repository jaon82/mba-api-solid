import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
}
