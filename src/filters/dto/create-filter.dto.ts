import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsString, Matches } from "class-validator";

export class CreateFilterDto {
    @ApiProperty({
        description: 'Filtros que se aplicarán (debe ser un objeto válido)',
        type: Object,
        example: { key: 'value' },
      })
    @IsNotEmpty({ message: "El parámetro 'filtros' es obligatorio." })
    @IsObject({ message: "El parámetro 'filtros' debe ser un objeto válido." })
    filtros: Record<string, any>;
  
    @ApiProperty({
        description: 'Nombre del filtro (debe ser un string sin caracteres no permitidos)',
        type: String,
        example: 'FiltroEjemplo',
      })
    @IsNotEmpty({ message: "El parámetro 'nombre' es obligatorio." })
    @IsString({ message: "El parámetro 'nombre' debe ser un string." })
    @Matches(/^[^'";\\%_]+$/, { message: "El 'nombre' contiene caracteres no permitidos" })
    nombre: string;
}
