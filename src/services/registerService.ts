import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma/UsersRepository";
import { hash } from "bcryptjs";

interface RegisterServiceParams {
  name: string;
  email: string;
  password: string;
}

export default async function registerService({
  name,
  email,
  password,
}: RegisterServiceParams) {
  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithEmail) {
    throw new Error("E-mail already exists.");
  }

  const passwordHash = await hash(password, 6);

  const prismaUsersRepository = new PrismaUsersRepository();
  prismaUsersRepository.create({ name, email, password_hash: passwordHash });
}
