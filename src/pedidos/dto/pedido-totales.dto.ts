import { ApiPropertyOptional } from '@nestjs/swagger';

/** Totales del pedido (desde PedidosTotal) para incluir en list/detalle. */
export class PedidoTotalesDto {
  @ApiPropertyOptional({ description: 'ID del total (PedidosTotal.IdPedidosTotalOPT)' })
  idPedidosTotalOPT?: number;

  @ApiPropertyOptional({ description: 'Subtotal' })
  subtotal?: number;

  @ApiPropertyOptional({ description: 'Descuentos' })
  dtos?: number;

  @ApiPropertyOptional({ description: 'Base imponible' })
  baseImp?: number;

  @ApiPropertyOptional({ description: 'Porcentaje de IVA' })
  ivaPor?: number;

  @ApiPropertyOptional({ description: 'Cuota de IVA' })
  ivaCuota?: number;

  @ApiPropertyOptional({ description: 'Porcentaje de recargo de equivalencia' })
  rePor?: number;

  @ApiPropertyOptional({ description: 'Cuota de recargo de equivalencia' })
  reCuota?: number;

  @ApiPropertyOptional({ description: 'Total impuestos' })
  impuestosTotal?: number;

  @ApiPropertyOptional({ description: 'Total' })
  total?: number;
}
