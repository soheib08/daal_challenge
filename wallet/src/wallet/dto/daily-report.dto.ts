import { ApiProperty } from '@nestjs/swagger';

export class DailyReportDto {
  @ApiProperty({
    example: 244,
    type: Number,
  })
  count: number;
}
