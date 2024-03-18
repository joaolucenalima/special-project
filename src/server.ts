import Fastify from 'fastify';
import { UserRoutes } from './routes/user';
import { env } from './utils/env';

const fastify = Fastify()

console.log(
  `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=profile%20email%20openid&redirect_uri=${env.GOOGLE_REDIRECT_URL}&client_id=${env.GOOGLE_CLIENT_ID}&access_type=offline`,
);

fastify.get('/', (_, reply) => {
  reply.send({ message: 'Hello World' })
})

fastify.register(UserRoutes)

fastify.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333!')
})