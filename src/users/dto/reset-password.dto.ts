import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'El email debe tener un formato válido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;
}