import { Controller, Inject } from '@nestjs/common';
import {
  CreateTransactionRequest,
  DailyReportRequest,
  DailyReportResponse,
  TransactionService,
} from './interface/transaction-grpc.interface';
import { GrpcMethod } from '@nestjs/microservices';
import { Transaction } from './entity/transaction';
import { ITransactionRepository } from './interface/ITransaction-repository.interface';

@Controller()
export class TransactionController implements TransactionService {
  constructor(
    @Inject(ITransactionRepository)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  @GrpcMethod('TransactionService', 'CreateTransaction')
  async createTransaction(data: CreateTransactionRequest) {
    let transaction = new Transaction(data.user, data.amount);
    return await this.transactionRepository.createOne(transaction);
  }

  @GrpcMethod('TransactionService', 'DailyReport')
  async dailyReport(data: DailyReportRequest): Promise<DailyReportResponse> {
    let count = await this.transactionRepository.countBy24Hour();
    return {
      count,
    };
  }
}
