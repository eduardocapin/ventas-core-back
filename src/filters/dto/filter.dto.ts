import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class FilterDto {
    @ApiProperty({
        description: 'ID del filtro',
        type: String,
    })
    @IsString()
    id: string;

    @ApiPropertyOptional({
        description: 'Valor del filtro, puede ser cualquier objeto',
        type: 'any',
    })
    @IsOptional()
    valor?: any;

    @ApiProperty({
        description: 'Tipo del filtro',
        type: String,
    })
    @IsString()
    tipo: string;
}