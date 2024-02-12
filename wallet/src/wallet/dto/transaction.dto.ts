import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  user: number;

  @ApiProperty({
    example: 10000,
    type: Number,
  })
  amount: number;
}

export class TransactionDto {
  user: number;
  amount: number;
  id: string;
}

export class TransactionResponseDto {
  reference_id: string;
}
