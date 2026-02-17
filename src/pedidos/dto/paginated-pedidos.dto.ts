import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginatedPedidosDto {
  @ApiPropertyOptional({ description: 'Filtros dinámicos seleccionados', type: [Object] })
  @IsOptional()
  @IsArray()
  selectedFilters?: any[];

  @ApiPropertyOptional({ description: 'Término de búsqueda', type: String })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @ApiProperty({ description: 'Página actual', type: Number })
  @IsNumber()
  @Type(() => Number)
  currentPage: number;

  @ApiProperty({ description: 'Items por página', type: Number })
  @IsNumber()
  @Type(() => Number)
  itemsPerPage: number;

  @ApiPropertyOptional({ description: 'Columna de ordenación', type: String })
  @IsOptional()
  @IsString()
  sortColumn?: string;

  @ApiPropertyOptional({ description: 'Dirección (asc/desc)', type: String })
  @IsOptional()
  @IsString()
  sortDirection?: string;

  @ApiPropertyOptional({ description: 'IDs de empresas para filtrar', type: [Number] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  empresasIds?: number[];

  @ApiPropertyOptional({ description: 'Fecha desde (ISO 8601). Incluye pedidos desde esta fecha' })
  @IsOptional()
  fechaDesde?: string;

  @ApiPropertyOptional({ description: 'Fecha hasta (ISO 8601). Incluye pedidos hasta esta fecha' })
  @IsOptional()
  fechaHasta?: string;
}
