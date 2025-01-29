import { IsNotEmpty, IsObject, IsString, Matches } from "class-validator";

export class CreateFilterDto {
    @IsNotEmpty({ message: "El parámetro 'filtros' es obligatorio." })
    @IsObject({ message: "El parámetro 'filtros' debe ser un objeto válido." })
    filtros: Record<string, any>;
  
    @IsNotEmpty({ message: "El parámetro 'nombre' es obligatorio." })
    @IsString({ message: "El parámetro 'nombre' debe ser un string." })
    @Matches(/^[^'";\\%_]+$/, { message: "El 'nombre' contiene caracteres no permitidos" })
    nombre: string;
}
