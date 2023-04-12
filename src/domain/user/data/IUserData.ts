import { UserEntity } from '../entities/UserEntity';

export interface IUserData {
  findByEmail(email: string): Promise<UserEntity | null>;
  create(user: UserEntity): Promise<UserEntity>;
}

export interface IUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface IUserResponseDTO {
  id: string;
}
