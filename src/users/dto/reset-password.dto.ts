import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    type: String,
    example: 'usuario@example.com',
  })
  @IsEmail({}, { message: 'El email debe tener un formato válido.' })
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  email: string;
}