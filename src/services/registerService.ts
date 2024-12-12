import { IUsersRepository } from "@/repositories/IUserRepository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError";

interface RegisterServiceParams {
  name: string;
  email: string;
  password: string;
}
interface RegisterServiceResponse {
  user: User;
}
export class RegisterService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterServiceParams): Promise<RegisterServiceResponse> {
    const userWithEmail = await this.usersRepository.findByEmail(email);

    if (userWithEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });
    return { user };
  }
}
