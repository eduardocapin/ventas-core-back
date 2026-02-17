import { ApiProperty } from '@nestjs/swagger';

export class DashboardTopProductoDto {
  @ApiProperty({ description: 'Referencia del producto' })
  referencia: string;

  @ApiProperty({ description: 'Descripción del producto' })
  descripcion: string;

  @ApiProperty({ description: 'Cantidad total vendida' })
  cantidadTotal: number;

  @ApiProperty({ description: 'Valor total vendido' })
  valorTotal: number;
}

export class DashboardTopProductosResponseDto {
  @ApiProperty({ type: [DashboardTopProductoDto], description: 'Top 10 productos' })
  items: DashboardTopProductoDto[];
}
