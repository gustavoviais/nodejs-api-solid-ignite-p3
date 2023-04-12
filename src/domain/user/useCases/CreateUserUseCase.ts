import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { IUserData, IUserRequestDTO } from '../data/IUserData';
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError';
import { UserEntity } from '../entities/UserEntity';

export class CreateUserUseCase {
  constructor(private userRepository: IUserData) {}

  async execute({
    name,
    email,
    password,
  }: IUserRequestDTO): Promise<UserEntity> {
    const passwordHash = await hash(password, 5);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    return this.userRepository.create({
      name,
      email,
      passwordHash,
    });
  }
}
