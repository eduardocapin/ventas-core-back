import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Nombre del permiso',
    example: 'CONFIGURACION_NUEVA_FUNCIONALIDAD'
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Descripción del permiso',
    example: 'Permite acceder a nueva funcionalidad',
    required: false
  })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
