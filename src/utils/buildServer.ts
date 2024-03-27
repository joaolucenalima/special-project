import { TaskRoutes } from '@/routes/task';
import { UserRoutes } from '@/routes/user';
import Fastify from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user_id: string;
  }
}

const buildServer = () => {
  const app = Fastify()

  app.decorateRequest('user', '')

  app.register(UserRoutes)
  app.register(TaskRoutes)

  app.get('/', (_, reply) => {
    return reply.send({ message: 'Hello World' })
  })

  return app
}

export { buildServer };

