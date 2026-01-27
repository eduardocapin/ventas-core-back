import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignPermissionDto {
  @ApiProperty({ description: 'ID del usuario' })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'ID del permiso' })
  @IsNumber()
  permissionId: number;
}
