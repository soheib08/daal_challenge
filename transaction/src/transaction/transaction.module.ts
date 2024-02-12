import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schema/transaction.entity';
import { ITransactionRepository } from './interface/ITransaction-repository.interface';
import { TransactionRepository } from './repository/transaction-repository';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Transaction',
        schema: TransactionSchema,
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [
    {
      provide: ITransactionRepository,
      useClass: TransactionRepository,
    },
  ],

  exports: [ITransactionRepository],
})
export default class TransactionModule {}
