import { makeFetchUserCheckInsHistoryService } from "@/services/factories/makeFetchUserCheckInsHistoryService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function historyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });
  const { page } = checkInHistoryQuerySchema.parse(request.query);
  const fetchUserCheckInsHistoryService = makeFetchUserCheckInsHistoryService();
  const { checkIns } = await fetchUserCheckInsHistoryService.execute({
    page,
    userId: request.user.sub,
  });
  return reply.status(200).send({
    checkIns,
  });
}
