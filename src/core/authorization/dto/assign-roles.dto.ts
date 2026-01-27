import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRolesDto {
  @ApiProperty({
    description: 'Array de IDs de roles a asignar',
    example: [1, 2],
    type: [Number]
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  roleIds: number[];
}
