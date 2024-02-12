import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import TransactionModule from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri:
          'mongodb://localhost:27017/daal' ||
          configService.get<string>(process.env.MONGODB_URL),
      }),
      inject: [ConfigService],
      imports: [],
    }),
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
