import { InMemoryUsersRepository } from "@/repositories/inMemory/UsersRepository";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError";
import { RegisterService } from "./registerService";

let usersRepository: InMemoryUsersRepository;
let registerService: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerService = new RegisterService(usersRepository);
  });

  it("should to register", async () => {
    const { user } = await registerService.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await registerService.execute({
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
    const email = "johndoe@example.com";

    await registerService.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerService.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
