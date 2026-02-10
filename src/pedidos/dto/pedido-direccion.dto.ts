import { ApiPropertyOptional } from '@nestjs/swagger';

/** Datos de dirección (desde columnas del pedido: Cliente_Direc, Cliente_Pobla, Cliente_Provin, Cliente_DP, Cliente_Telefono, etc.). Para sección "Datos dirección" en el visor. */
export class PedidoDireccionDto {
  @ApiPropertyOptional({ description: 'Nombre (ej. nombre comercial del cliente)' })
  nombre?: string;

  @ApiPropertyOptional({ description: 'Dirección' })
  direccion?: string;

  @ApiPropertyOptional({ description: 'Contacto' })
  contacto?: string;

  @ApiPropertyOptional({ description: 'Población' })
  poblacion?: string;

  @ApiPropertyOptional({ description: 'Provincia' })
  provincia?: string;

  @ApiPropertyOptional({ description: 'Código postal' })
  cp?: string;

  @ApiPropertyOptional({ description: 'Teléfono' })
  tfno?: string;
}
