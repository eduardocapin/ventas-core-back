import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para cada ítem del top 10 pedidos en el dashboard.
 *
 * Para cambiar qué campo de BD se muestra en un campo del DTO:
 * 1. Opcional: renombra o añade la propiedad aquí (y en el frontend si aplica).
 * 2. En PedidosService.getTop10Pedidos():
 *    - Cambia el .addSelect('p.propiedadEntidad', 'alias') para leer otra columna.
 *    - El 'alias' debe coincidir con el nombre de la propiedad del DTO.
 *    - En el .map() de results, asigna r.alias al campo del DTO.
 *
 * Ejemplo: mostrar delegación en lugar de nombreCliente
 *   En servicio: .addSelect('COALESCE(p.delegacion, \'Sin delegación\')', 'nombreCliente')
 *   (o añade campo delegacion al DTO y usa .addSelect('p.delegacion', 'delegacion')).
 *
 * Campos disponibles en Pedido (entidad): id, numero, cliente, agente, fecha,
 * fechaEntrega, delegacion, tipoDocumento, idDocumentoPDA, codigoCliente, etc.
 */
export class DashboardTopPedidoDto {
  @ApiProperty({ description: 'ID del pedido' })
  pedidoId: number;

  @ApiProperty({ description: 'Número de referencia del pedido' })
  numero: string;

  @ApiProperty({ description: 'Nombre del cliente' })
  nombreCliente: string;

  @ApiProperty({ description: 'Fecha del pedido' })
  fecha: Date;

  @ApiProperty({ description: 'Valor total del pedido' })
  valorTotal: number;
}

export class DashboardTopPedidosResponseDto {
  @ApiProperty({ type: [DashboardTopPedidoDto], description: 'Top 10 pedidos' })
  items: DashboardTopPedidoDto[];
}
