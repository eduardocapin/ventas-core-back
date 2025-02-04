import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
export class LoginDto {
  @IsNotEmpty({ message: 'El email es obligatoria' })
  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @Matches(/^(?!.*['";\\%_]).*$/, { message: 'La contraseña contiene caracteres no permitidos' })
  password: string;
}