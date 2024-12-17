import { InMemoryCheckInsRepository } from "@/repositories/inMemory/CheckInsRepository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CheckInService from "./checkInService";

let checkInsRepository: InMemoryCheckInsRepository;
let checkInService: CheckInService;

describe("Check In Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    checkInService = new CheckInService(checkInsRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should to able to check in", async () => {
    const { checkIn } = await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it.only("should not be able to check in twice a day", async () => {
    vi.setSystemTime(new Date(2024, 11, 16, 8, 0, 0));

    await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    await expect(
      checkInService.execute({
        gymId: "gym-01",
        userId: "user-01",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice in different days", async () => {
    vi.setSystemTime(new Date(2024, 11, 16, 8, 0, 0));
    await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    vi.setSystemTime(new Date(2024, 11, 17, 8, 0, 0));
    const { checkIn } = await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
