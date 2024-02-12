import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BallanceService } from './service/ballance.service';
import { MoneyService } from './service/money.service';
import {
  CreateTransactionDto,
  TransactionResponseDto,
} from './dto/transaction.dto';
import { BalanceDto } from './dto/ballance.dto';
import { DailyReportService } from './service/daily-report.service';
import { DailyReportDto } from './dto/daily-report.dto';

@Controller()
@ApiTags('Wallet')
export class WalletController {
  constructor(
    private readonly ballanceService: BallanceService,
    private readonly moneyService: MoneyService,
    private readonly dailyReportService: DailyReportService,
  ) {}

  @Post('money')
  @ApiOperation({ summary: 'create a transaction' })
  @ApiResponse({ type: TransactionResponseDto })
  @HttpCode(HttpStatus.CREATED)
  createTransaction(@Body() body: CreateTransactionDto) {
    return this.moneyService.handle(body);
  }

  @Get('balance/:userId')
  @ApiParam({ example: 1, name: 'userId' })
  @ApiOperation({ summary: 'get user balance' })
  @ApiResponse({ type: BalanceDto })
  @HttpCode(HttpStatus.OK)
  getBalance(@Param('userId', ParseIntPipe) id: number) {
    return this.ballanceService.handle(id);
  }

  @Get('daily-report')
  @ApiOperation({ summary: 'get 24 hour transaction count' })
  @ApiResponse({ type: DailyReportDto })
  @HttpCode(HttpStatus.OK)
  getDailyReport() {
    return this.dailyReportService.handle();
  }
}
