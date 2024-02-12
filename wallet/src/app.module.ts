import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import WalletModule from './wallet/wallet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>(process.env.MONGODB_URL) ||
          'mongodb://localhost:27017/daal',
      }),
      inject: [ConfigService],
      imports: [],
    }),
    WalletModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
