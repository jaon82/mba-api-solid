import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterServiceParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: unknown) {}

  async execute({ name, email, password }: RegisterServiceParams) {
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

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
