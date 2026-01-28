import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class LanguageDto {
  @ApiProperty({ description: 'Código del idioma (es, en, pt, etc.)' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Nombre del idioma' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Indica si es el idioma por defecto', required: false })
  @IsNumber()
  @IsOptional()
  isDefault?: number;

  @ApiProperty({ description: 'Indica si el idioma está activo', required: false })
  @IsNumber()
  @IsOptional()
  active?: number;
}
