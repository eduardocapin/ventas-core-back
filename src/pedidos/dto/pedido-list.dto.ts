import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PedidoAgenteDto } from './pedido-agente.dto';
import { PedidoTotalesDto } from './pedido-totales.dto';

/**
 * DTO para listado de pedidos (tabla Importador de Documentos).
 * Orden de columnas en UI: combo integración, estado importación, tipo pedido, código documento,
 * fecha documento, hora consolidación, fecha entrega, código cliente, nombre cliente, nombre agente,
 * código agente, importe descuento1, importe descuento2, importe descuento DToPP, importe, total,
 * tiene firma, nota, origen, tipo pedido (2ª), error integración.
 */
export class PedidoListDto {
  @ApiProperty({ description: 'ID del pedido' })
  id: number;

  @ApiPropertyOptional({ description: 'Estado de importación (EstadoImportacion)' })
  estadoImportacion?: string;

  @ApiPropertyOptional({ description: 'Tipo de pedido / tipo documento' })
  tipoPedido?: string;

  @ApiPropertyOptional({ description: 'Código del documento (Referencia_Pedido)' })
  codigoDocumento?: string;

  @ApiPropertyOptional({ description: 'Fecha del documento' })
  fechaDocumento?: Date;

  @ApiPropertyOptional({ description: 'Hora de consolidación del pedido' })
  horaConsolidacion?: string;

  @ApiPropertyOptional({ description: 'Fecha de entrega' })
  fechaEntrega?: Date;

  @ApiPropertyOptional({ description: 'Código del cliente' })
  codigoCliente?: string;

  @ApiPropertyOptional({ description: 'Nombre del cliente' })
  nombreCliente?: string;

  @ApiPropertyOptional({ description: 'Código del documento (desde Pedidos.IdDocumentoPDA)' })
  idDocumentoPDA?: string;

  @ApiPropertyOptional({ description: 'Código PDA (legacy, numérico desde PedidosTotal.IdPedidoPDA)' })
  codigoPda?: number;

  @ApiPropertyOptional({ description: 'Nombre del agente' })
  nombreAgente?: string;

  @ApiPropertyOptional({ description: 'Código del agente' })
  codigoAgente?: string;

  @ApiPropertyOptional({ description: 'Importe del descuento 1' })
  importeDescuento1?: number;

  @ApiPropertyOptional({ description: 'Importe del descuento 2' })
  importeDescuento2?: number;

  @ApiPropertyOptional({ description: 'Importe del descuento DToPP' })
  importeDescuentoDToPP?: number;

  @ApiPropertyOptional({ description: 'Importe (subtotal)' })
  importe?: number;

  @ApiPropertyOptional({ description: 'Total del pedido' })
  total?: number;

  @ApiPropertyOptional({ description: 'Indica si tiene firma' })
  tieneFirma?: boolean;

  @ApiPropertyOptional({ description: 'Nota / observaciones' })
  nota?: string;

  @ApiPropertyOptional({ description: 'Origen (delegación / agencia)' })
  origen?: string;

  @ApiPropertyOptional({ description: 'Error de integración' })
  errorIntegracion?: string;

  /** Datos del cliente vinculado (Cod_Agente_Fabricante → Clientes.Id) para códigos y nombre */
  @ApiPropertyOptional()
  agenteDatos?: PedidoAgenteDto;

  /** Totales del pedido (desde PedidosTotal) */
  @ApiPropertyOptional()
  totales?: PedidoTotalesDto;

  // Campos legacy por compatibilidad
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
}
