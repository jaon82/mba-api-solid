import { ICheckInsRepository } from "@/repositories/ICheckInsRepository";
import { CheckIn } from "@prisma/client";

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export default class CheckInService {
  constructor(private checkinsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkIn = await this.checkinsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });
    return { checkIn };
  }
}
