import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  CreateTransactionRequest,
  DailyReportResponse,
  Transaction,
  TransactionService,
} from '../interface/transaction-grpc.interface';

@Injectable()
export class TransactionGrpcService implements OnModuleInit {
  constructor() {}
  @Client({
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_URL || 'localhost:50051',
      package: 'transaction',
      protoPath: join(__dirname, '../../../src', 'transaction.proto'),
    },
  })
  client: ClientGrpc;
  private transactionService: TransactionService;

  onModuleInit() {
    this.transactionService =
      this.client.getService<TransactionService>('TransactionService');
  }

  createTransaction(data: CreateTransactionRequest): Promise<Transaction> {
    return new Promise((resolve, rejects) => {
      try {
        let createdTransactionObservable =
          this.transactionService.createTransaction(data);
        createdTransactionObservable.subscribe((result) => {
          resolve(result);
        });
      } catch (err) {
        rejects();
      }
    });
  }

  dailyReport(): Promise<DailyReportResponse> {
    return new Promise((resolve, rejects) => {
      try {
        let createdTransactionObservable = this.transactionService.dailyReport(
          {},
        );
        createdTransactionObservable.subscribe((result) => {
          resolve(result);
        });
      } catch (err) {
        console.log(err);

        rejects();
      }
    });
  }
}
