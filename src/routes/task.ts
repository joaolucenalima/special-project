import addTask from "@/controllers/add-task-controller";
import { verifySessionMiddleware } from "@/controllers/verify-session-middleware";
import { FastifyInstance } from "fastify";

export async function TaskRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifySessionMiddleware)

  app.post("/task", addTask)
}