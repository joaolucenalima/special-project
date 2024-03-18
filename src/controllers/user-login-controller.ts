import { UserRepository } from "@/repositories/user";
import { GoogleServices } from "@/services/google-login.service";
import { UserServices } from "@/services/user.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);

const googleServices = new GoogleServices()

async function userLogin(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    code: z.string(),
  })

  const { code } = paramsSchema.parse(request.query)

  const access_token = await googleServices.getAccessToken(code)
  const userData = await googleServices.getUserData(access_token)

  try {
    await userServices.login(userData)
    return reply.status(201).send({ message: "User created" })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ message: "Internal server error" })
  }
}

export default userLogin