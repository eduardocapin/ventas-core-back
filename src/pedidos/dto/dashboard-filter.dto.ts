import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsArray, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class DashboardFilterDto {
  @ApiPropertyOptional({ type: [Number], description: 'IDs de empresas para filtrar' })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  empresasIds?: number[];

  @ApiPropertyOptional({ description: 'Fecha desde (ISO 8601). Incluye pedidos desde esta fecha' })
  @IsOptional()
  @IsDateString()
  fechaDesde?: string;

  @ApiPropertyOptional({ description: 'Fecha hasta (ISO 8601). Incluye pedidos hasta esta fecha' })
  @IsOptional()
  @IsDateString()
  fechaHasta?: string;
}
