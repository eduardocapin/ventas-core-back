import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PedidoListDto {
  @ApiProperty({ description: 'ID del pedido' })
  id: number;

  @ApiPropertyOptional({ description: 'Tipo de documento' })
  tipoDocumento?: string;

  @ApiPropertyOptional({ description: 'Número de documento' })
  numero?: string;

  @ApiPropertyOptional({ description: 'Cliente' })
  cliente?: string;

  @ApiPropertyOptional({ description: 'Agente' })
  agente?: string;

  @ApiPropertyOptional({ description: 'Fecha' })
  fecha?: Date;

  @ApiPropertyOptional({ description: 'Delegación' })
  delegacion?: string;

  @ApiPropertyOptional({ description: 'Estado de integración' })
  estadoIntegracion?: string;

  @ApiPropertyOptional({ description: 'Mensaje de error de integración' })
  mensajeErrorIntegracion?: string;
}
