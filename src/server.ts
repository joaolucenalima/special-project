import Fastify from 'fastify'
import { UserRoutes } from './routes/user/auth'
import { env } from './utils/env'

const fastify = Fastify()

fastify.register(UserRoutes)

fastify.get('/', (_, reply) => {
  reply.send({ message: 'Hello World' })
})

console.log(
  `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=profile%20email%20openid&redirect_uri=${env.GOOGLE_REDIRECT_URL}&client_id=${env.GOOGLE_CLIENT_ID}&access_type=offline`,
);

fastify.listen({ port: 3333 })