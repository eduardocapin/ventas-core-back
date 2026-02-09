import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity('PedidosDetalle')
export class PedidoDetalle {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'IdPedido', type: 'int' })
  pedidoId: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.lineas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'IdPedido' })
  pedido: Pedido;

  @Column({ name: 'Referencia', type: 'varchar', length: 45, nullable: true })
  referencia: string;

  @Column({ name: 'Descripcion', type: 'varchar', length: 500, nullable: true })
  descripcion: string;

  @Column({ name: 'Unidades', type: 'decimal', precision: 18, scale: 4, default: 0 })
  unidades: number;

  @Column({ name: 'Precio', type: 'decimal', precision: 18, scale: 4, default: 0 })
  precio: number;

  @Column({ name: 'Descuento', type: 'decimal', precision: 18, scale: 4, default: 0 })
  descuento: number;

  @Column({ name: 'Total', type: 'decimal', precision: 18, scale: 4, default: 0 })
  total: number;

  @Column({ name: 'FechaInsert', type: 'datetime', nullable: true })
  insert_date: Date;

  @Column({ name: 'BajaEnERP', type: 'bit', default: () => "'0'" })
  deleted: boolean;
}
