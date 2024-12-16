import { InMemoryUsersRepository } from "@/repositories/inMemory/UsersRepository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import GetUserProfileService from "./getUserProfileService";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe("Get User Profile Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });
    const { user } = await sut.execute({
      userId: createdUser.id,
    });
    expect(user.name).toEqual(createdUser.name);
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing--id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
