import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO alineado con la tabla [dbo].[PedidosTotal].
 * Totales e impuestos del pedido (subtotal, IVA, RE, total).
 */
export class PedidosTotalDto {
  @ApiProperty({ description: 'ID del total de pedido (PK)' })
  idPedidosTotalOPT: number;

  @ApiPropertyOptional({ description: 'ID del total en ERP', maxLength: 100 })
  idPedidosTotalERP?: string;

  @ApiPropertyOptional({ description: 'ID del pedido (OPT)' })
  idPedidoOPT?: number;

  @ApiPropertyOptional({ description: 'ID del pedido PDA' })
  idPedidoPDA?: number;

  @ApiPropertyOptional({ description: 'ID del pedido en ERP', maxLength: 50 })
  idPedidoERP?: string;

  @ApiPropertyOptional({ description: 'ID del IVA (OPT)' })
  idIvaOPT?: number;

  @ApiPropertyOptional({ description: 'ID del IVA PDA' })
  idIvaPDA?: number;

  @ApiPropertyOptional({ description: 'ID del IVA en ERP', maxLength: 20 })
  idIvaERP?: string;

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

  @ApiPropertyOptional({ description: 'Fecha de inserción' })
  fechaInsert?: Date;

  @ApiPropertyOptional({ description: 'Fecha de actualización' })
  fechaUpdate?: Date;

  @ApiPropertyOptional({ description: 'ID del agente propietario' })
  idAgentePropietario?: number;

  @ApiPropertyOptional({ description: 'ID del registro PDA' })
  idRegistroPDA?: number;

  @ApiPropertyOptional({ description: 'ID del agente que actualizó' })
  idAgenteUpdate?: number;

  @ApiPropertyOptional({ description: 'Tipo de documento', maxLength: 3 })
  tipoDocumento?: string;

  @ApiPropertyOptional({ description: 'Estado de importación', maxLength: 2 })
  estadoImportacion?: string;

  @ApiPropertyOptional({ description: 'Borrado lógico en ERP' })
  bajaEnERP?: boolean;

  @ApiPropertyOptional({ description: 'GUID en ERP' })
  guiderp?: string;

  @ApiPropertyOptional({ description: 'ID de tarea de integración', maxLength: 50 })
  idTareaIntegracion?: string;

  @ApiPropertyOptional({ description: 'ID único tablet', maxLength: 50 })
  idUnicoTablet?: string;

  @ApiPropertyOptional({ description: 'ID único venta tablet', maxLength: 50 })
  idUnicoVentaTablet?: string;

  @ApiPropertyOptional({ description: 'ID de tarea del dispositivo', maxLength: 50 })
  idTareaDispositivo?: string;

  @ApiPropertyOptional({ description: 'Errores de integración', maxLength: 4000 })
  erroresIntegracion?: string;
}
