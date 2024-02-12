import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../interface/IUser-repository.interface';
import { User } from '../entity/user.entity';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private transactionModel: Model<User>,
  ) {}

  async createOne(user: User): Promise<User> {
    let newUser = this.transactionModel.create(user);
    return newUser;
  }

  async findOne(id: number) {
    return await this.transactionModel.findOne({ id: id });
  }
}
