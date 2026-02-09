import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PedidoDetalle } from './pedido-detalle.entity';

@Entity('Pedidos')
export class Pedido {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'TipoDocumento', type: 'varchar', length: 45, nullable: true })
  tipoDocumento: string;

  @Column({ name: 'Numero', type: 'varchar', length: 45, nullable: true })
  numero: string;

  @Column({ name: 'Cliente', type: 'varchar', length: 255, nullable: true })
  cliente: string;

  @Column({ name: 'Agente', type: 'varchar', length: 45, nullable: true })
  agente: string;

  @Column({ name: 'Fecha', type: 'datetime', nullable: true })
  fecha: Date;

  @Column({ name: 'Delegacion', type: 'varchar', length: 45, nullable: true })
  delegacion: string;

  @Column({ name: 'EstadoIntegracion', type: 'varchar', length: 45, nullable: true })
  estadoIntegracion: string;

  @Column({ name: 'MensajeErrorIntegracion', type: 'text', nullable: true })
  mensajeErrorIntegracion: string;

  @Column({ name: 'Observaciones', type: 'text', nullable: true })
  observaciones: string;

  @Column({ name: 'FechaInsert', type: 'datetime', nullable: true })
  insert_date: Date;

  @Column({ name: 'FechaUpdate', type: 'datetime', nullable: true })
  update_date: Date;

  @Column({ name: 'BajaEnERP', type: 'bit', default: () => "'0'" })
  deleted: boolean;

  @OneToMany(() => PedidoDetalle, (detalle) => detalle.pedido)
  lineas: PedidoDetalle[];
}
