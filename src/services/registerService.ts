import { IUsersRepository } from "@/repositories/IUserRepository";
import { hash } from "bcryptjs";

interface RegisterServiceParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: RegisterServiceParams) {
    const userWithEmail = await this.usersRepository.findByEmail(email);

    if (userWithEmail) {
      throw new Error("E-mail already exists.");
    }

    const passwordHash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });
  }
}
