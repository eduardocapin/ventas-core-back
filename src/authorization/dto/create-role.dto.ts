import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'ID del rol',
    example: 4
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Nombre del rol',
    example: 'Supervisor'
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Descripción del rol',
    example: 'Rol con permisos de supervisión',
    required: false
  })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
