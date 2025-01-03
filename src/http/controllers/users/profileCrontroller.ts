import { makeGetUserProfileService } from "@/services/factories/makeGetUserProfileService";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profileCrontroller(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getUserProfileService = makeGetUserProfileService();
  const { user } = await getUserProfileService.execute({
    userId: request.user.sub,
  });
  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
