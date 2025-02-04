import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Correo electrónico del usuario',
    type: String,
    example: 'usuario@example.com',
  })
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Nombre de usuario',
    type: String,
    example: 'usuario123',
  })
  @IsOptional()
  @IsString()
  @Matches(/^(?!.*['";\\%_]).*$/, { message: 'Caracteres inválidos en user' })
  user?: string;

  @ApiPropertyOptional({
    description: 'Cargo del usuario',
    type: String,
    example: 'Administrador',
  })
  @IsOptional()
  @IsString()
  @Matches(/^(?!.*['";\\%_]).*$/, { message: 'Caracteres inválidos en cargo' })
  cargo?: string;

  @ApiPropertyOptional({
    description: 'URL de la imagen del usuario',
    type: String,
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  img?: string;

  @ApiPropertyOptional({
    description: 'Contraseña actual del usuario',
    type: String,
    example: 'ContraseñaActual123',
  })
  @IsOptional()
  @IsString()
  @Matches(/^(?!.*['";\\%_]).*$/, { message: 'Caracteres inválidos en oldpass' })
  oldpass?: string;

  @ApiPropertyOptional({
    description: 'Nueva contraseña del usuario',
    type: String,
    example: 'NuevaContraseña456',
  })
  @IsOptional()
  @IsString()
  @Matches(/^(?!.*['";\\%_]).*$/, { message: 'Caracteres inválidos en newpass' })
  newpass?: string;
}