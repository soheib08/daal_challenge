import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IRequestHandler } from '../interface/IRequest-handler.interface';
import {
  CreateTransactionDto,
  TransactionResponseDto,
} from '../dto/transaction.dto';
import { IWalletRepository } from '../interface/IWallet-repository.interface';
import { TransactionGrpcService } from './transaction.service';

@Injectable()
export class MoneyService implements IRequestHandler {
  constructor(
    @Inject(IWalletRepository)
    private walletRepository: IWalletRepository,
    private transactionService: TransactionGrpcService,
  ) {}
  async handle(body: CreateTransactionDto): Promise<TransactionResponseDto> {
    let foundWallet = await this.walletRepository.findOne(body.user);
    if (!foundWallet) throw new NotFoundException('user not found');

    if (body.amount < 0 && foundWallet.ballance + body.amount < 0)
      throw new BadRequestException('not enough money');

    let transaction = await this.transactionService.createTransaction({
      amount: body.amount,
      user: body.user,
    });
    foundWallet.ballance += body.amount;

    await this.walletRepository.updateOne(foundWallet.user, {
      ballance: foundWallet.ballance,
      lastUpdate: transaction.date,
    });

    return { reference_id: transaction.id };
  }
}
