import { FastifyInstance } from "fastify";
import userLogin from "../controllers/user-login-controller";

export async function UserRoutes(app: FastifyInstance) {
  app.get("/login/callback", userLogin)
}