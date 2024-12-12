import { InMemoryUsersRepository } from "@/repositories/inMemory/UsersRepository";
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError";
import { RegisterService } from "./registerService";

describe("Register Service", () => {
  it("should to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterService(usersRepository);
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const repository = new InMemoryUsersRepository();
    const service = new RegisterService(repository);

    const { user } = await service.execute({
      name: "John Doe",
      email: "johndoe@exaple.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBeTruthy();
  });

  it("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterService(usersRepository);
    const email = "johndoe@example.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
