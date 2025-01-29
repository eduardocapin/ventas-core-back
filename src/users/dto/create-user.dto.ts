import { IsNotEmpty, IsEmail, IsString, Length, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  lastname: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsPhoneNumber(null, { message: 'El teléfono debe ser válido' })
  telefono: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @Length(6, 20, { message: 'La contraseña debe tener entre 6 y 20 caracteres' })
  password: string;
}

