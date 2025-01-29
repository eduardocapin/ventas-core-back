import { IsOptional, IsString, IsArray, IsInt } from 'class-validator';

export class UpdateCompetitorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true }) // Validar que todos los elementos del array sean números
  product_segmentation_ids?: number[];
}