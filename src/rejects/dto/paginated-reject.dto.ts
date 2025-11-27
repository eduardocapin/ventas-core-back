import {
  IsArray,
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterDto } from 'src/filters/dto/filter.dto';


export class PaginatedRejectsDto {
  @ApiPropertyOptional({
    description: 'Filtros seleccionados (opcional)',
    type: [FilterDto],

  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  selectedFilters?: FilterDto[];

  @ApiPropertyOptional({
    description: 'Término de búsqueda (opcional)',
    type: String,
    example: 'Rechazo por producto defectuoso',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[^'";\\%_]*$/, { message: 'El termino de busqueda contiene caracteres no permitidos' })
  searchTerm?: string;

  @ApiProperty({
    description: 'Página actual (número de página)',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  currentPage: number;

  @ApiProperty({
    description: 'Cantidad de elementos por página',
    type: Number,
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  itemsPerPage: number;

  @ApiPropertyOptional({
    description: 'Columna por la cual ordenar los resultados (opcional)',
    type: String,
    example: 'fecha',
  })
  @IsOptional()
  @IsString()
  sortColumn?: string;

  @ApiPropertyOptional({
    description: 'Dirección de ordenamiento (opcional)',
    type: String,
    example: 'asc',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[^'";\\%_]*$/, { message: 'El texto de direccion de ordenamiento contiene caracteres no permitidos' })
  sortDirection?: string;

  //Propiedad empresa seleccionada añadida
  @IsOptional()
  selectedEmpresa?: number | string;

  // IDs de empresas del usuario para filtrado automático
  @IsOptional()
  userEmpresaIds?: number[];

}
