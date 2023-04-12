import { FastifyInstance } from 'fastify';
import { register } from './user/controllers/register';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
}
