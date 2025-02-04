import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateReasonsRejectionDto {
    @ApiProperty({
        description: "Código del rechazo (debe ser un string sin caracteres no permitidos)",
        type: String,
        example: "RECHAZO001",
      })
    @IsNotEmpty({ message: "El parámetro 'codigo' es obligatorio." })
    @IsString({ message: "El parámetro 'codigo' debe ser un string." })
    @Matches(/^[^'"\\%;_]*$/, { message: "El parámetro 'codigo' contiene caracteres no permitidos." })
    codigo: string;

    @ApiProperty({
        description: "Nombre del rechazo (debe ser un string sin caracteres no permitidos)",
        type: String,
        example: "Rechazo por error de datos",
      })
    @IsNotEmpty({ message: "El parámetro 'nombre' es obligatorio." })
    @IsString({ message: "El parámetro 'nombre' debe ser un string." })
    @Matches(/^[^'"\\%;_]*$/, { message: "El parámetro 'nombre' contiene caracteres no permitidos." })
    nombre: string;
}
