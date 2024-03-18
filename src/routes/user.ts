import userLogin from "@/controllers/user-login-controller";
import { FastifyInstance } from "fastify";

export async function UserRoutes(app: FastifyInstance) {
  app.get("/login/callback", userLogin)
}