import { User } from "@/database/models/user-model";
import { SessionRepository } from "@/repositories/session-repository";
import { UserRepository } from "@/repositories/user-repository";
import { SessionService } from "@/services/session.service";
import { UserServices } from "@/services/user.service";
import { env } from "@/utils/env";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface GoogleTokensResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  id_token: string;
}

const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);

const sessionRepository = new SessionRepository();
const sessionService = new SessionService(sessionRepository);

async function userLogin(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    code: z.string(),
  })

  const { code } = paramsSchema.parse(request.query)

  const paramsValues = new URLSearchParams({
    code,
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    redirect_uri: env.GOOGLE_REDIRECT_URL,
    grant_type: "authorization_code",
  });

  const { access_token } = await fetch(
    `https://oauth2.googleapis.com/token?${paramsValues}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  ).then(res => res.json() as Promise<GoogleTokensResponse>);

  const userData = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(res => res.json() as Promise<User>);

  try {
    const user_id = await userServices.login(userData)
    await sessionService.upsertSession(user_id)
    return reply.redirect("/")
  } catch (err) {
    console.error(err)
    return reply.status(500).send({ error: "Internal server error" })
  }
}

export default userLogin