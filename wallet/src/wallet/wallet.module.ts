import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { WalletSchema } from './schema/wallet.schema';
import { IWalletRepository } from './interface/IWallet-repository.interface';
import { WalletRepository } from './repository/wallet.repository';
import { IUserRepository } from './interface/IUser-repository.interface';
import { UserRepository } from './repository/user.repository';
import { TransactionGrpcService } from './service/transaction.service';
import { BallanceService } from './service/ballance.service';
import { UserService } from './service/user.service';
import { MoneyService } from './service/money.service';
import { WalletController } from './wallet.controller';
import { DailyReportService } from './service/daily-report.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Wallet',
        schema: WalletSchema,
      },
    ]),
  ],
  controllers: [WalletController],
  providers: [
    TransactionGrpcService,
    BallanceService,
    UserService,
    MoneyService,
    DailyReportService,
    {
      provide: IWalletRepository,
      useClass: WalletRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],

  exports: [IUserRepository, IWalletRepository],
})
export default class WalletModule {}
