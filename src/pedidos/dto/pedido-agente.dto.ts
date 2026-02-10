import { ApiPropertyOptional } from '@nestjs/swagger';

/** Datos asociados al pedido vía Cod_Agente_Fabricante (FK a Clientes.Id). Se reutiliza para compatibilidad API. */
export class PedidoAgenteDto {
  @ApiPropertyOptional({ description: 'ID (Clientes.Id cuando la FK es Cod_Agente_Fabricante)' })
  id?: number;

  @ApiPropertyOptional({ description: 'Nombre del agente' })
  nombre?: string;

  @ApiPropertyOptional({ description: 'Código agente fabricante' })
  codigoAgenteFabricante?: string;

  @ApiPropertyOptional({ description: 'Código agente ERP' })
  codigoAgenteERP?: string;
}
