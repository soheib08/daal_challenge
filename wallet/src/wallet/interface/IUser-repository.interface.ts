import { User } from '../entity/user.entity';

export interface IUserRepository {
  createOne(user: User): Promise<User>;
  findOne(id: number): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
