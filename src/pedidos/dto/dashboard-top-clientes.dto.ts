import { ApiProperty } from '@nestjs/swagger';

export class DashboardTopClienteDto {
  @ApiProperty({ description: 'ID del cliente' })
  clienteId: number;

  @ApiProperty({ description: 'Nombre del cliente' })
  nombreCliente: string;

  @ApiProperty({ description: 'Total de pedidos del cliente' })
  totalPedidos: number;

  @ApiProperty({ description: 'Valor total de pedidos del cliente' })
  valorTotal: number;
}

export class DashboardTopClientesResponseDto {
  @ApiProperty({ type: [DashboardTopClienteDto], description: 'Top 10 clientes' })
  items: DashboardTopClienteDto[];
}
