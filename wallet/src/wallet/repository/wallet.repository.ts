import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWalletRepository } from '../interface/IWallet-repository.interface';
import { Wallet } from '../entity/wallet.entity';

export class WalletRepository implements IWalletRepository {
  constructor(
    @InjectModel(Wallet.name)
    private transactionModel: Model<Wallet>,
  ) {}

  async createOne(wallet: Wallet): Promise<Wallet> {
    let newWallet = this.transactionModel.create(wallet);
    return newWallet;
  }

  async updateOne(id: number, entity: Partial<Wallet>) {
    await this.transactionModel.updateOne(
      { user: id },
      {
        $set: {
          ...entity,
        },
      },
    );
  }

  async findOne(id: number) {
    return await this.transactionModel.findOne({ user: id });
  }
}
