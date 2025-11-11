import {
  IsOptional,
  IsString,
  IsNumber
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginatedUsersDto {
  @ApiPropertyOptional({
    description: 'Término de búsqueda para filtrar usuarios',
    type: String,
  })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @ApiProperty({
    description: 'Página actual para la paginación',
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  currentPage: number;

  @ApiProperty({
    description: 'Cantidad de items por página',
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  itemsPerPage: number;

  @ApiPropertyOptional({
    description: 'Columna por la cual ordenar',
    type: String,
  })
  @IsOptional()
  @IsString()
  sortColumn?: string;

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento (asc o desc)',
    type: String,
  })
  @IsOptional()
  @IsString()
  sortDirection?: string;
}
