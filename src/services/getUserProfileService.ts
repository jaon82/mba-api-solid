import { IUsersRepository } from "@/repositories/IUserRepository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";

interface GetUserProfileServiceRequest {
  userId: string;
}

interface GetUserProfileServiceResponse {
  user: User;
}

export default class GetUserProfileService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return {
      user,
    };
  }
}
