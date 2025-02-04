import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, IsNumber, Min, Matches } from 'class-validator';

export class UpdateRejectDto {
    @ApiProperty({
        description: 'Estado de la solicitud de rechazo',
        type: String,
        example: 'Rechazado',
      })
    @IsNotEmpty({ message: 'El estado es obligatorio' })
    @IsString({ message: 'El estado debe ser una cadena' })
    status: string;

    @ApiProperty({
        description: 'ID del estado de la solicitud de rechazo (debe ser un número entero mayor a 0)',
        type: Number,
        example: 1,
      })
    @IsNotEmpty({ message: 'El ID de estado es obligatorio' })
    @IsInt({ message: 'El ID de estado debe ser un número entero' })
    @Min(1, { message: 'El ID de estado debe ser mayor a 0' })
    status_id: number;

    @ApiProperty({
        description: 'Motivo de rechazo',
        type: String,
        example: 'Producto defectuoso',
      })
    @IsNotEmpty({ message: 'El motivo de rechazo es obligatoria' })
    @IsString({ message: 'El motivo de rechazo debe ser una cadena' })
    reason_rejection: string;

    @ApiProperty({
        description: 'ID de la razón de rechazo (debe ser un número entero mayor a 0)',
        type: Number,
        example: 1,
      })
    @IsNotEmpty({ message: 'El ID de razón de rechazo es obligatorio' })
    @IsInt({ message: 'El ID de razón de rechazo debe ser un número entero' })
    @Min(1, { message: 'El ID de razón de rechazo debe ser mayor a 0' })
    reason_rejection_id: number;

    @ApiPropertyOptional({
        description: 'Nombre del competidor (opcional)',
        type: String,
        example: 'Competidor XYZ',
      })
    @IsOptional()
    @IsString({ message: 'El nombre del competidor debe ser una cadena' })
    competitor_name?: string;

    @ApiPropertyOptional({
        description: 'ID del competidor (opcional, debe ser un número entero mayor a 0)',
        type: Number,
        example: 2,
      })
    @IsOptional()
    @IsInt({ message: 'El ID del competidor debe ser un número entero' })
    @Min(1, { message: 'El ID del competidor debe ser mayor a 0' })
    competitor_id?: number;

    @ApiPropertyOptional({
        description: 'Valor de la acción correctora (opcional, debe ser un número)',
        type: Number,
        example: 100,
      })
    @IsOptional()
    @IsNumber({}, { message: 'El valor de acción correctora debe ser un número' })
    corrective_action_value?: number;

    @ApiProperty({
        description: 'ID del símbolo de acción correctora (debe ser un número entero mayor a 0)',
        type: Number,
        example: 1,
      })
    @IsNotEmpty({ message: 'El ID del símbolo de acción correctora es obligatorio' })
    @IsInt({ message: 'El ID del símbolo de acción correctora debe ser un número entero' })
    @Min(1, { message: 'El ID del símbolo de acción correctora debe ser mayor a 0' })
    corrective_action_symbol_id: number;

    @ApiProperty({
        description: 'Símbolo de acción correctora',
        type: String,
        example: '%',
      })
    @IsNotEmpty({ message: 'El símbolo de acción correctora es obligatorio' })
    @IsString({ message: 'El símbolo de acción correctora debe ser una cadena' })
    corrective_action_symbol: string;

    @ApiPropertyOptional({
        description: 'Texto de la acción correctora (opcional, puede contener solo caracteres permitidos)',
        type: String,
        example: 'Reemplazar la pieza defectuosa',
      })
    @IsOptional()
    @IsString({ message: 'El texto de la acción correctora debe ser una cadena' })
    @Matches(/^[^'";\\%_]*$/, { message: 'El texto de acción correctora contiene caracteres no permitidos' })
    corrective_action_text?: string;
}
