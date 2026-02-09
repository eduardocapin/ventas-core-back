import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PedidoDetalleLineaDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  referencia?: string;

  @ApiPropertyOptional()
  descripcion?: string;

  @ApiProperty()
  unidades: number;

  @ApiProperty()
  precio: number;

  @ApiProperty()
  descuento: number;

  @ApiProperty()
  total: number;
}
