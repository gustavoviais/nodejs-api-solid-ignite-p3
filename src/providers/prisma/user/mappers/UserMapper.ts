import { UserEntity } from '@/domain/user/entities/UserEntity';
import { Prisma } from '@prisma/client';

export class UserMapper {
  static toEntity(model: Prisma.UserCreateInput): UserEntity {
    return {
      ...model,
      passwordHash: model?.password_hash,
    };
  }

  static toModel(entity: UserEntity): Prisma.UserCreateInput {
    return {
      name: entity.name,
      email: entity.email,
      password_hash: entity?.passwordHash,
    };
  }
}
