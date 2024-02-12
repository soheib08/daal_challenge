import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IRequestHandler } from '../interface/IRequest-handler.interface';
import { IWalletRepository } from '../interface/IWallet-repository.interface';
import { BalanceDto } from '../dto/ballance.dto';

@Injectable()
export class BallanceService implements IRequestHandler {
  constructor(
    @Inject(IWalletRepository)
    private walletRepository: IWalletRepository,
  ) {}

  async handle(userId: number): Promise<BalanceDto> {
    let foundWallet = await this.walletRepository.findOne(userId);
    if (!foundWallet) throw new NotFoundException('user not found');

    return { ballance: foundWallet.ballance };
  }
}
