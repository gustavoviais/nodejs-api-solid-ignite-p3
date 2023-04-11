import { IUserData } from '@/domain/user/data/IUserData';
import { UserEntity } from '@/domain/user/entities/UserEntity';
import { prisma } from '@/lib/prisma';
import { UserMapper } from '../mappers/UserMapper';

export class PrismaUserRepository implements IUserData {
  findByEmail(email: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.');
  }
  async create(entity: UserEntity) {
    const data = UserMapper.toModel(entity);
    const userModel = await prisma.user.create({ data });

    return UserMapper.toEntity(userModel);
  }
}
