import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { IUserData } from '../data/IUserData';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserData) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 5);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.');
    }

    await this.userRepository.create({
      name,
      email,
      passwordHash,
    });
  }
}
