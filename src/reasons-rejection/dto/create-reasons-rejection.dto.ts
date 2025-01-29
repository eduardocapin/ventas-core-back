import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateReasonsRejectionDto {
    @IsNotEmpty({ message: "El parámetro 'codigo' es obligatorio." })
    @IsString({ message: "El parámetro 'codigo' debe ser un string." })
    @Matches(/^[^'"\\%;_]*$/, { message: "El parámetro 'codigo' contiene caracteres no permitidos." })
    codigo: string;

    @IsNotEmpty({ message: "El parámetro 'nombre' es obligatorio." })
    @IsString({ message: "El parámetro 'nombre' debe ser un string." })
    @Matches(/^[^'"\\%;_]*$/, { message: "El parámetro 'nombre' contiene caracteres no permitidos." })
    nombre: string;
}
