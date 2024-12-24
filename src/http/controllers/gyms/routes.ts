import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createController } from "./createController";
import { nearbyController } from "./nearbyController";
import { searchController } from "./searchController";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", searchController);
  app.get("/gyms/nearby", nearbyController);
  app.post("/gyms", createController);
}
