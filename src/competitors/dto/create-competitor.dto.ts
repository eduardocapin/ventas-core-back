import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ArrayNotEmpty, Matches } from 'class-validator';
export class CreateCompetitorDto {
    @ApiProperty({
        description: 'Nombre del competidor',
        type: String,
      })
    @IsString()
    @Matches(/^[^'";\\%_]+$/, { message: 'El nombre contiene caracteres no permitidos' })
    nombre: string;


    @ApiPropertyOptional({
        description: 'Lista de IDs de segmentación de productos asociados al competidor',
        type: [String],
      })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    product_segmentation_ids?: string[];
}
