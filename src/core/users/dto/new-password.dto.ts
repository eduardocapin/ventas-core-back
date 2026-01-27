import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class NewPasswordDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        type: String,
        example: 'usuario@example.com',
      })
    @IsNotEmpty({ message: 'El email es obligatoria' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario (no debe contener caracteres especiales prohibidos)',
        type: String,
        example: 'MiContraseña123',
      })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @Matches(/^(?!.*['";\\%_]).*$/, { message: 'La contraseña contiene caracteres no permitidos' })
    newpass: string;
}
