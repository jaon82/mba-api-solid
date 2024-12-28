import { verifyJWT } from "@/http/middlewares/verifyJWT";
import { verifyUserRole } from "@/http/middlewares/verifyUserRole";
import { FastifyInstance } from "fastify";
import { createController } from "./createController";
import { historyController } from "./historyController";
import { metricsController } from "./metricsController";
import { validateController } from "./validateController";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.get("/check-ins/history", historyController);
  app.get("/check-ins/metrics", metricsController);
  app.post("/gyms/:gymId/check-ins", createController);
  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validateController
  );
}
