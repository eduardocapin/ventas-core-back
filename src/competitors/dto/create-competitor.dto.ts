import { IsString, IsOptional, IsArray, ArrayNotEmpty, Matches } from 'class-validator';
export class CreateCompetitorDto {
    @IsString()
    @Matches(/^[^'";\\%_]+$/, { message: 'El nombre contiene caracteres no permitidos' })
    nombre: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    product_segmentation_ids?: number[];
}
