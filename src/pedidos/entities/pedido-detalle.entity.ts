import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';

/**
 * Entidad alineada con la tabla [dbo].[PedidosDetalle].
 * PK: Auto. Relación con cabecera: Codigo_PedidoAuto referencia a Pedidos.Id_Pedido.
 */
@Entity('PedidosDetalle')
export class PedidoDetalle {
  @PrimaryGeneratedColumn({ name: 'Auto' })
  id: number;

  /** FK a Pedidos.Id_Pedido */
  @Column({ name: 'Codigo_PedidoAuto', type: 'int' })
  pedidoId: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.lineas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Codigo_PedidoAuto' })
  pedido: Pedido;

  @Column({ name: 'Referencia_Articulo', type: 'nvarchar', length: 30, nullable: true })
  referencia: string | null;

  @Column({ name: 'Descripcion', type: 'nvarchar', length: 255, nullable: true })
  descripcion: string | null;

  @Column({ name: 'Cantidad', type: 'float', nullable: true })
  unidades: number;

  @Column({ name: 'Importe', type: 'float', nullable: true })
  precio: number;

  @Column({ name: 'Descuento', type: 'float', nullable: true })
  descuento: number;

  @Column({ name: 'Total', type: 'float', nullable: true })
  total: number;

  @Column({ name: 'EstadoImportacion', type: 'nvarchar', length: 2, nullable: true })
  estadoIntegracion: string | null;

  @Column({ name: 'ErroresIntegracion', type: 'nvarchar', length: 4000, nullable: true })
  mensajeErrorIntegracion: string | null;

  @Column({ name: 'FechaInsert', type: 'datetime', nullable: true })
  insert_date: Date | null;

  @Column({ name: 'BajaEnERP', type: 'bit', nullable: true })
  deleted: boolean;
}
