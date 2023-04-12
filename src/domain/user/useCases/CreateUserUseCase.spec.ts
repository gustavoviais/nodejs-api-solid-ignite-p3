import { expect, describe, it } from 'vitest';
import { CreateUserUseCase } from '@/domain/user/useCases/CreateUserUseCase';
import { compare } from 'bcryptjs';
import { FakeUserRepository } from '@/providers/fake/FakeUserRepository';
import { UserAlreadyExistsError } from '@/domain/user/errors/UserAlreadyExistsError';

describe('Create User UseCase', () => {
  it('should be able to create a new user', async () => {
    const userRepository = new FakeUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const user = await createUserUseCase.execute({
      name: 'Gustavo Viais',
      email: 'gustavoviais@mydomain.com',
      password: '132456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const userRepository = new FakeUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const user = await createUserUseCase.execute({
      name: 'Gustavo Viais',
      email: 'gustavoviais@mydomain.com',
      password: '132456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '132456',
      user.passwordHash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to create a user with an existent email', async () => {
    const userRepository = new FakeUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const email = 'gustavoviais@mydomain.com';

    await createUserUseCase.execute({
      name: 'Gustavo Viais',
      email,
      password: '132456',
    });

    expect(() =>
      createUserUseCase.execute({
        name: 'Gustavo Viais',
        email,
        password: '132456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
