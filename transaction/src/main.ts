import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'transaction',
      url: process.env.GRPC_URL,
      protoPath: join(__dirname, '../', 'src/transaction.proto'),
    },
  });

  await app.listen();
}
bootstrap();
