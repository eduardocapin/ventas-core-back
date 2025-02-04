import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, Length, IsPhoneNumber, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    type: String,
    example: 'Juan',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Matches(/^[^'";\\%_]*$/, { message: 'El texto del nombre contiene caracteres no permitidos' })
  name: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    type: String,
    example: 'Pérez',
  })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @Matches(/^[^'";\\%_]*$/, { message: 'El texto de direccion del apellido contiene caracteres no permitidos' })
  lastname: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    type: String,
    example: 'juan.perez@example.com',
  })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    type: String,
    example: '+5491133344455',
  })
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsPhoneNumber(null, { message: 'El teléfono debe ser válido' })
  @Matches(/^[^'";\\%_]*$/, { message: 'El texto del número contiene caracteres no permitidos' })
  telefono: string;

  @ApiProperty({
    description: 'Contraseña del usuario (debe tener entre 6 y 20 caracteres)',
    type: String,
    example: 'securePass123',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @Length(6, 20, { message: 'La contraseña debe tener entre 6 y 20 caracteres' })
  @Matches(/^[^'";\\%_]*$/, { message: 'El texto de la contraseña contiene caracteres no permitidos' })
  password: string;
}

