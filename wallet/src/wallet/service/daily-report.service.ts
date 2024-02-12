import { Injectable } from '@nestjs/common';
import { IRequestHandler } from '../interface/IRequest-handler.interface';
import { DailyReportDto } from '../dto/daily-report.dto';
import { TransactionGrpcService } from './transaction.service';

@Injectable()
export class DailyReportService implements IRequestHandler {
  constructor(private transactionService: TransactionGrpcService) {}

  async handle(): Promise<DailyReportDto> {
    let count = await this.transactionService.dailyReport();
    return count;
  }
}
