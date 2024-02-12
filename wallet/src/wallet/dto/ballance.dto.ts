import { ApiProperty } from '@nestjs/swagger';

export class BalanceDto {
  @ApiProperty({
    example: 100000,
  })
  ballance: number;
}
