import { Transaction } from '../entity/transaction';

export interface ITransactionRepository {
  createOne(transaction: Transaction): Promise<Transaction>;
  deleteOne(id: string): Promise<void>;
  findOne(id: string): Promise<Transaction>;
  countBy24Hour(): Promise<number>;
}

export const ITransactionRepository = Symbol('ITransactionRepository');
