import { ApiPropertyOptional } from '@nestjs/swagger';

/** Datos del cliente comprador (desde Clientes, Cod_Cliente_Fabricante = IdClienteFabricante). Para sección "Datos cliente" en el visor. */
export class PedidoClienteDto {
  @ApiPropertyOptional({ description: 'Código cliente (IdClienteFabricante)' })
  codigo?: string;

  @ApiPropertyOptional({ description: 'Nombre comercial' })
  nombreComercial?: string;

  @ApiPropertyOptional({ description: 'Nombre fiscal / razón social' })
  nombreFiscal?: string;

  @ApiPropertyOptional({ description: 'CIF/NIF' })
  cif?: string;

  @ApiPropertyOptional({ description: 'Dirección' })
  direccion?: string;

  @ApiPropertyOptional({ description: 'Población' })
  poblacion?: string;

  @ApiPropertyOptional({ description: 'Provincia' })
  provincia?: string;

  @ApiPropertyOptional({ description: 'Teléfono' })
  telefono?: string;

  @ApiPropertyOptional({ description: 'Fax' })
  fax?: string;

  @ApiPropertyOptional({ description: 'Email' })
  email?: string;

  @ApiPropertyOptional({ description: 'Banco' })
  banco?: string;

  @ApiPropertyOptional({ description: 'Número de cuenta' })
  cuenta?: string;
}
