import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class KpisFilterDto {
  @ApiProperty({
    description: 'IDs de empresas para filtrar los KPIs',
    type: [Number],
    required: false,
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  empresasIds?: number[];
}
