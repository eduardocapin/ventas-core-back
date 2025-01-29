import { IsNotEmpty, IsInt, IsString, Min, Matches } from 'class-validator';
export class UpdateRejectCorrectiveActionDto{
    @IsNotEmpty({ message: 'El ID del estado de la acción correctora es obligatorio' })
    @IsInt({ message: 'El ID del estado de la acción correctora debe ser un número entero' })
    @Min(1, { message: 'El ID del estado de la acción correctora debe ser mayor a 0' })
    corrective_action_status_id: number;
  
    @IsNotEmpty({ message: 'El estado de la acción correctora es obligatorio' })
    @IsString({ message: 'El estado de la acción correctora debe ser una cadena' })
    @Matches(/^[^'";\\%_]*$/, { message: 'El estado de la acción correctora contiene caracteres no permitidos' })
    corrective_action_status: string;
  }
