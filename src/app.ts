import fastify from 'fastify';
import { appRoutes } from './infra/http/routes';

export const app = fastify();

app.register(appRoutes);
