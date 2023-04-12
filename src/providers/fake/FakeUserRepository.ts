import { IUserData } from '@/domain/user/data/IUserData';
import { UserEntity } from '@/domain/user/entities/UserEntity';

export class FakeUserRepository implements IUserData {
  public users: UserEntity[] = [];

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find(currentUser => currentUser.email === email);

    if (!user) return null;

    return user;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const fakeUser = {
      id: 'user-1',
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
    };

    this.users.push(fakeUser as UserEntity);

    return fakeUser;
  }
}
