import { InMemoryCheckInsRepository } from "@/repositories/inMemory/CheckInsRepository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsService } from "./getUserMetricsService";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsService;

describe("Ger User Metrics Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });
    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });
    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });
    expect(checkInsCount).toEqual(2);
  });
});
