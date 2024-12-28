import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verifyJWT";
import { authenticateCrontroller } from "./authenticateCrontroller";
import { profileCrontroller } from "./profileCrontroller";
import { refreshController } from "./refreshController";
import { registerController } from "./registerController";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateCrontroller);
  app.patch("/token/refresh", refreshController);
  app.get("/me", { onRequest: [verifyJWT] }, profileCrontroller);
}
