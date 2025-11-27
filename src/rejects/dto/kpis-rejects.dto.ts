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

  
  export class KPIsRejectsDto {
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

    // Empresa seleccionada
    @IsOptional()
    selectedEmpresa?: number | string;

    // IDs de empresas del usuario para filtrado automático
    @IsOptional()
    userEmpresaIds?: number[];

  }
