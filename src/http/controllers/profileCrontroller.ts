import { FastifyReply, FastifyRequest } from "fastify";

export async function profileCrontroller(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify();
  console.log(request.user);
  return reply.status(200).send();
}