import { UserEntity } from '../entities/UserEntity';

export interface IUserData {
  findByEmail(email: string): Promise<UserEntity | null>;
  create(user: UserEntity): Promise<UserEntity>;
}
