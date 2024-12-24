import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { authenticateCrontroller } from "./authenticateCrontroller";
import { profileCrontroller } from "./profileCrontroller";
import { registerController } from "./registerController";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateCrontroller);
  app.get("/me", { onRequest: [verifyJWT] }, profileCrontroller);
}
