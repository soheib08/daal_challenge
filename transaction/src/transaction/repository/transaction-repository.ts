import { log } from '@grpc/grpc-js/build/src/logging';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from 'src/transaction/entity/transaction';
import { ITransactionRepository } from 'src/transaction/interface/ITransaction-repository.interface';

export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<Transaction>,
  ) {}

  async createOne(transaction: Transaction): Promise<Transaction> {
    let newTransaction = this.transactionModel.create(transaction);
    return newTransaction;
  }

  async deleteOne(id: string) {
    await this.transactionModel.deleteOne({ _id: id });
  }

  async findOne(id: string) {
    return await this.transactionModel.findOne({ _id: id });
  }

  async countBy24Hour(): Promise<number> {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    let res = await this.transactionModel
      .countDocuments({
        date: { $gte: twentyFourHoursAgo, $lte: now },
      })
      .exec();

    return res;
  }
}
