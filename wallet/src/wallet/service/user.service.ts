import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { IUserRepository } from '../interface/IUser-repository.interface';
import { User } from '../entity/user.entity';
import { IWalletRepository } from '../interface/IWallet-repository.interface';
import { Wallet } from '../entity/wallet.entity';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
    @Inject(IWalletRepository) private walletRepository: IWalletRepository,
  ) {}

  async onModuleInit() {
    let foundUser1 = await this.userRepository.findOne(1);
    if (!foundUser1) {
      let createdUser = await this.userRepository.createOne(new User(0));

      this.walletRepository.createOne(new Wallet(createdUser.id));
    }

    let foundUser2 = await this.userRepository.findOne(2);
    if (!foundUser2) {
      let createdUser = await this.userRepository.createOne(new User(1));
      this.walletRepository.createOne(new Wallet(createdUser.id));
    }
  }
}
