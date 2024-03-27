import { makeSessionService } from "@/services/factories/make-session-service"
import { FastifyReply, FastifyRequest } from "fastify"

export async function verifySessionMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const session_id = request.headers.authorization?.split(" ")[1]

  if (!session_id) {
    reply.code(401).send({ message: "Unauthorized" })
    return
  }

  const sessionServices = makeSessionService()

  const sess = await sessionServices.verifySession(session_id)

  if (!sess) {
    reply.code(401).send({ message: "Unauthorized" })
    return
  }
  request.user_id = sess.user_id
} 