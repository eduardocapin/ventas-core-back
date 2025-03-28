import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsInt } from 'class-validator';

export class UpdateCompetitorDto {
  @ApiPropertyOptional({
    description: 'Nombre actualizado del competidor',
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Lista actualizada de IDs de segmentación de productos asociados al competidor',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Validar que todos los elementos del array sean números
  product_segmentation_ids?: string[];
}