import { CreateUserUseCase } from '@/domain/user/useCases/CreateUserUseCase';
import { PrismaUserRepository } from '@/providers/prisma/user/repositories/UserRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const prismaUserRepository = new PrismaUserRepository();
    const registerUseCase = new CreateUserUseCase(prismaUserRepository);

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
