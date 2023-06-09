import { IUserResponseDTO } from '@/domain/user/data/IUserData';
import { UserAlreadyExistsError } from '@/domain/user/errors/UserAlreadyExistsError';
import { CreateUserUseCase } from '@/domain/user/useCases/CreateUserUseCase';
import { PrismaUserRepository } from '@/providers/prisma/user/repositories/UserRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<IUserResponseDTO> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const prismaUserRepository = new PrismaUserRepository();
    const registerUseCase = new CreateUserUseCase(prismaUserRepository);

    const createdUser = await registerUseCase.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send({ id: createdUser.id } as IUserResponseDTO);
  } catch (error) {
    if (error instanceof UserAlreadyExistsError)
      return reply.status(409).send({ message: error.message });
    throw error;
  }
}
