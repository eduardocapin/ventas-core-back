import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, Length, IsOptional, Matches, IsArray, IsNumber, ArrayMinSize } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    type: String,
    example: 'Juan Pérez',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Matches(/^[^'";\\%_]*$/, { message: 'El texto del nombre contiene caracteres no permitidos' })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    type: String,
    example: 'juan.perez@example.com',
  })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (debe tener entre 6 y 20 caracteres, ya encriptada con MD5)',
    type: String,
    example: 'a1b2c3d4e5f6...',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  password: string;

  @ApiProperty({
    description: 'Cargo del usuario en la empresa',
    type: String,
    example: 'Gerente de Ventas',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El cargo debe ser una cadena de texto' })
  @Matches(/^[^'";\\%_]*$/, { message: 'El texto del cargo contiene caracteres no permitidos' })
  position_company?: string;

  @ApiProperty({
    description: 'Imagen de perfil del usuario (base64)',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La imagen debe ser una cadena de texto' })
  image?: string;

  @ApiProperty({
    description: 'IDs de los roles a asignar al usuario',
    type: [Number],
    example: [1, 2],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Los roles deben ser un array' })
  @IsNumber({}, { each: true, message: 'Cada rol debe ser un número' })
  roleIds?: number[];

  @ApiProperty({
    description: 'IDs de los permisos adicionales a asignar al usuario',
    type: [Number],
    example: [11, 12],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Los permisos deben ser un array' })
  @IsNumber({}, { each: true, message: 'Cada permiso debe ser un número' })
  permissionIds?: number[];

  @ApiProperty({
    description: 'IDs de las empresas a asignar al usuario (al menos una es obligatoria)',
    type: [Number],
    example: [1, 2],
    required: true,
  })
  @IsNotEmpty({ message: 'Debe asignar al menos una empresa al usuario' })
  @IsArray({ message: 'Las empresas deben ser un array' })
  @ArrayMinSize(1, { message: 'Debe asignar al menos una empresa al usuario' })
  @IsNumber({}, { each: true, message: 'Cada empresa debe ser un número' })
  empresaIds: number[];
}
