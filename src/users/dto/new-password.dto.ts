import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class NewPasswordDto {
    @IsNotEmpty({ message: 'El email es obligatoria' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @Matches(/^(?!.*['";\\%_]).*$/, { message: 'La contraseña contiene caracteres no permitidos' })
    newpass: string;
}
