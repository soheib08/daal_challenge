import { Wallet } from '../entity/wallet.entity';

export interface IWalletRepository {
  createOne(wallet: Wallet): Promise<Wallet>;
  updateOne(id: number, wallet: Partial<Wallet>): Promise<void>;
  findOne(id: number): Promise<Wallet>;
}

export const IWalletRepository = Symbol('IWalletRepository');
