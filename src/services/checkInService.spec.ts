import { InMemoryCheckInsRepository } from "@/repositories/inMemory/CheckInsRepository";
import { beforeEach, describe, expect, it } from "vitest";
import CheckInService from "./checkInService";

let checkInsRepository: InMemoryCheckInsRepository;
let checkInService: CheckInService;

describe("Check In Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    checkInService = new CheckInService(checkInsRepository);
  });

  it("should to able to check in", async () => {
    const { checkIn } = await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
