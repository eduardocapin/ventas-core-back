import { IsNotEmpty, IsOptional, IsString, IsInt, IsNumber, Min, Matches } from 'class-validator';

export class UpdateRejectDto {
    @IsNotEmpty({ message: 'El estado es obligatorio' })
    @IsString({ message: 'El estado debe ser una cadena' })
    status: string;

    @IsNotEmpty({ message: 'El ID de estado es obligatorio' })
    @IsInt({ message: 'El ID de estado debe ser un número entero' })
    @Min(1, { message: 'El ID de estado debe ser mayor a 0' })
    status_id: number;

    @IsNotEmpty({ message: 'La razón de rechazo es obligatoria' })
    @IsString({ message: 'La razón de rechazo debe ser una cadena' })
    reason_rejection: string;

    @IsNotEmpty({ message: 'El ID de razón de rechazo es obligatorio' })
    @IsInt({ message: 'El ID de razón de rechazo debe ser un número entero' })
    @Min(1, { message: 'El ID de razón de rechazo debe ser mayor a 0' })
    reason_rejection_id: number;

    @IsOptional()
    @IsString({ message: 'El nombre del competidor debe ser una cadena' })
    competitor_name?: string;

    @IsOptional()
    @IsInt({ message: 'El ID del competidor debe ser un número entero' })
    @Min(1, { message: 'El ID del competidor debe ser mayor a 0' })
    competitor_id?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El valor de acción correctiva debe ser un número' })
    corrective_action_value?: number;

    @IsNotEmpty({ message: 'El ID del símbolo de acción correctiva es obligatorio' })
    @IsInt({ message: 'El ID del símbolo de acción correctiva debe ser un número entero' })
    @Min(1, { message: 'El ID del símbolo de acción correctiva debe ser mayor a 0' })
    corrective_action_symbol_id: number;

    @IsNotEmpty({ message: 'El símbolo de acción correctiva es obligatorio' })
    @IsString({ message: 'El símbolo de acción correctiva debe ser una cadena' })
    corrective_action_symbol: string;

    @IsOptional()
    @IsString({ message: 'El texto de la acción correctiva debe ser una cadena' })
    @Matches(/^[^'";\\%_]*$/, { message: 'El texto de acción correctiva contiene caracteres no permitidos' })
    corrective_action_text?: string;
}
