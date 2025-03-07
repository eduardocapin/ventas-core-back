import {
    IsArray,
    IsOptional,
    IsString,
    IsNumber,
    ValidateNested
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from 'src/filters/dto/filter.dto';
  

  
  export class PaginatedClientsDto {
    @ApiPropertyOptional({
      description: 'Filtros seleccionados para la búsqueda',
      type: [FilterDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FilterDto)
    selectedFilters?: FilterDto[];
  
    @ApiPropertyOptional({
      description: 'Término de búsqueda para filtrar clientes',
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
      description: 'Columna por la que se ordenarán los resultados',
      type: String,
    })
    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @ApiPropertyOptional({
      description: 'Dirección del ordenamiento (ascendente/descendente)',
      type: String,
    })
    @IsOptional()
    @IsString()
    sortDirection?: string;
  }
  