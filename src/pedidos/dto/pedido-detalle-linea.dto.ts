import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO para línea de detalle de pedido (PedidosDetalle).
 * Orden columnas UI: combo integración, código artículo, descripción artículo, código promoción,
 * unidades vendidas, descripción unidad vendida, importe, descuento1-5, total,
 * motivo devolución, combo adjunto, nota línea, error integración.
 */
export class PedidoDetalleLineaDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional({ description: 'Estado de integración (combo de integración)' })
  comboIntegracion?: string;

  @ApiPropertyOptional({ description: 'Código del artículo' })
  codigoArticulo?: string;

  @ApiPropertyOptional({ description: 'Descripción del artículo' })
  descripcionArticulo?: string;

  @ApiPropertyOptional({ description: 'Código de la promoción' })
  codigoPromocion?: string;

  @ApiPropertyOptional({ description: 'Unidades vendidas' })
  unidadesVendidas?: number;

  @ApiPropertyOptional({ description: 'Descripción de la unidad vendida' })
  descripcionUnidadVendida?: string;

  @ApiPropertyOptional({ description: 'Importe' })
  importe?: number;

  @ApiPropertyOptional({ description: 'Descuento 1' })
  descuento1?: number;

  @ApiPropertyOptional({ description: 'Descuento 2' })
  descuento2?: number;

  @ApiPropertyOptional({ description: 'Descuento 3' })
  descuento3?: number;

  @ApiPropertyOptional({ description: 'Descuento 4' })
  descuento4?: number;

  @ApiPropertyOptional({ description: 'Descuento 5' })
  descuento5?: number;

  @ApiPropertyOptional({ description: 'Total' })
  total?: number;

  @ApiPropertyOptional({ description: 'Motivo devolución' })
  motivoDevolucion?: string;

  @ApiPropertyOptional({ description: 'Combo de adjunto' })
  comboAdjunto?: string;

  @ApiPropertyOptional({ description: 'Nota de línea' })
  notaLinea?: string;

  @ApiPropertyOptional({ description: 'Error de integración' })
  errorIntegracion?: string;

  /** Legacy */
  @ApiPropertyOptional()
  referencia?: string;
  @ApiPropertyOptional()
  descripcion?: string;
  @ApiPropertyOptional()
  unidades?: number;
  @ApiPropertyOptional()
  precio?: number;
  @ApiPropertyOptional()
  descuento?: number;
  @ApiPropertyOptional()
  estadoIntegracion?: string;
  @ApiPropertyOptional()
  mensajeErrorIntegracion?: string;
}
