import { InMemoryCheckInsRepository } from "@/repositories/inMemory/CheckInsRepository";
import { InMemoryGymsRepository } from "@/repositories/inMemory/GymsRepository";
import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CheckInService from "./checkInService";
import { MaxDistanceError } from "./errors/MaxDistanceError";
import { MaxNumberOfCheckInsError } from "./errors/MaxNumberOfCheckInsError";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let checkInService: CheckInService;

describe("Check In Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    checkInService = new CheckInService(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: -3.1001722,
      longitude: -60.0253015,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should to able to check in", async () => {
    const { checkIn } = await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -3.1001722,
      userLongitude: -60.0253015,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice a day", async () => {
    vi.setSystemTime(new Date(2024, 11, 16, 8, 0, 0));

    await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -3.1001722,
      userLongitude: -60.0253015,
    });

    await expect(
      checkInService.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -3.1001722,
        userLongitude: -60.0253015,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice in different days", async () => {
    vi.setSystemTime(new Date(2024, 11, 16, 8, 0, 0));
    await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -3.1001722,
      userLongitude: -60.0253015,
    });

    vi.setSystemTime(new Date(2024, 11, 17, 8, 0, 0));
    const { checkIn } = await checkInService.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -3.1001722,
      userLongitude: -60.0253015,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Java Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-3.1284424),
      longitude: new Decimal(-60.0209481),
    });
    await expect(() =>
      checkInService.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -3.1413142,
        userLongitude: -60.0337556,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
