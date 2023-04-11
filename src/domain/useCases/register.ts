import { prisma } from '@/lib/prisma';
import { PrismaUserRepository } from '@/providers/prisma/repositories/UserRepository';
import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 5);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.');
  }

  const prismaUserRepository = new PrismaUserRepository();

  await prismaUserRepository.create({
    name,
    email,
    password_hash,
  });
}
