import { InMemoryGymsRepository } from "@/repositories/inMemory/GymsRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsService } from "./fetchNearbyGymsService";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe("Fetch Nearby Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });
    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    });
    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
