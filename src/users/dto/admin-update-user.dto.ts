import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class AdminUpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nombre completo del usuario',
    type: String,
    example: 'Juan Pérez',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del usuario',
    type: String,
    example: 'juan.perez@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser válido' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Contraseña (MD5 hash desde el frontend)',
    type: String,
    example: '5f4dcc3b5aa765d61d8327deb882cf99',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    description: 'Cargo en la empresa',
    type: String,
    example: 'Gerente de Ventas',
  })
  @IsOptional()
  @IsString()
  position_company?: string;

  @ApiPropertyOptional({
    description: 'Imagen de perfil (base64 o URL)',
    type: String,
    example: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    description: 'Array de IDs de roles a asignar',
    type: [Number],
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  roleIds?: number[];

  @ApiPropertyOptional({
    description: 'Array de IDs de permisos adicionales a asignar',
    type: [Number],
    example: [3, 5, 7],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  permissionIds?: number[];
}
