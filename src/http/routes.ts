import { FastifyInstance } from "fastify";
import { authenticateCrontroller } from "./controllers/authenticateCrontroller";
import { profileCrontroller } from "./controllers/profileCrontroller";
import { registerController } from "./controllers/registerController";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateCrontroller);
  app.get("/me", profileCrontroller);
}
