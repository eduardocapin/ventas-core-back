import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PedidoDetalleLineaDto } from './pedido-detalle-linea.dto';

export class PedidoDetalleDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  tipoDocumento?: string;

  @ApiPropertyOptional()
  numero?: string;

  @ApiPropertyOptional()
  cliente?: string;

  @ApiPropertyOptional()
  agente?: string;

  @ApiPropertyOptional()
  fecha?: Date;

  @ApiPropertyOptional()
  delegacion?: string;

  @ApiPropertyOptional()
  estadoIntegracion?: string;

  @ApiPropertyOptional()
  mensajeErrorIntegracion?: string;

  @ApiPropertyOptional()
  observaciones?: string;

  @ApiProperty({ type: [PedidoDetalleLineaDto], description: 'Líneas del pedido' })
  lineas: PedidoDetalleLineaDto[];
}
