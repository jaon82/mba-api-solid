import { FastifyInstance } from "fastify";
import { authenticateCrontroller } from "./controllers/authenticateCrontroller";
import { profileCrontroller } from "./controllers/profileCrontroller";
import { registerController } from "./controllers/registerController";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateCrontroller);
  app.get("/me", { onRequest: [verifyJWT] }, profileCrontroller);
}
