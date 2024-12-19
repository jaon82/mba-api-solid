import { ICheckInsRepository } from "@/repositories/ICheckInsRepository";
import { IGymsRepository } from "@/repositories/IGymsRepository";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates";
import { CheckIn } from "@prisma/client";
import { MaxDistanceError } from "./errors/MaxDistanceError";
import { MaxNumberOfCheckInsError } from "./errors/MaxNumberOfCheckInsError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export default class CheckInService {
  MAX_DISTANCE_IN_KILOMETERS = 0.1;

  constructor(
    private checkinsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );
    if (distance > this.MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInSameDay = await this.checkinsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );
    if (checkInSameDay) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkinsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });
    return { checkIn };
  }
}
