import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PedidoDetalleLineaDto } from './pedido-detalle-linea.dto';
import { PedidoAgenteDto } from './pedido-agente.dto';
import { PedidoTotalesDto } from './pedido-totales.dto';
import { PedidoClienteDto } from './pedido-cliente.dto';
import { PedidoDireccionDto } from './pedido-direccion.dto';

export class PedidoDetalleDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  tipoDocumento?: string;

  @ApiPropertyOptional()
  numero?: string;

  @ApiPropertyOptional()
  cliente?: string;

  @ApiPropertyOptional({ description: 'Nombre del agente (denormalizado)' })
  agente?: string;

  @ApiPropertyOptional({ description: 'Datos del agente (Cod_Agente_Fabricante → Clientes.Id)' })
  agenteDatos?: PedidoAgenteDto;

  @ApiPropertyOptional({ description: 'Datos del cliente comprador (Cod_Cliente_Fabricante → Clientes.IdClienteFabricante)' })
  clienteDatos?: PedidoClienteDto;

  @ApiPropertyOptional({ description: 'Datos de dirección del pedido (columnas Cliente_Direc, Cliente_Pobla, etc.)' })
  datosDireccion?: PedidoDireccionDto;

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

  @ApiPropertyOptional({ description: 'Totales del pedido (desde PedidosTotal)' })
  totales?: PedidoTotalesDto;

  @ApiProperty({ type: [PedidoDetalleLineaDto], description: 'Líneas del pedido' })
  lineas: PedidoDetalleLineaDto[];
}
