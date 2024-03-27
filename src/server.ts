import { env } from '@/utils/env';
import { buildServer } from './utils/buildServer';

console.log(
  `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=profile%20email%20openid&redirect_uri=${env.GOOGLE_REDIRECT_URL}&client_id=${env.GOOGLE_CLIENT_ID}&access_type=offline`,
);

const fastify = buildServer()

fastify.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333!')
})