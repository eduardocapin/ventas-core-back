import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';

/**
 * Entidad alineada con la tabla [dbo].[PedidosTotal].
 * PK: IdPedidosTotalOPT. Relación con Pedidos: PedidosTotal.IdPedidoOPT = Pedidos.Id_Pedido.
 * Contiene los totales e impuestos del pedido (subtotal, IVA, RE, total).
 */
@Entity('PedidosTotal')
export class PedidosTotal {
  @PrimaryGeneratedColumn({ name: 'IdPedidosTotalOPT' })
  idPedidosTotalOPT: number;

  @Column({ name: 'IdPedidosTotalERP', type: 'nvarchar', length: 100, nullable: true })
  idPedidosTotalERP: string | null;

  /** FK a Pedidos.Id_Pedido */
  @Column({ name: 'IdPedidoOPT', type: 'int', nullable: true })
  idPedidoOPT: number | null;

  @Column({ name: 'IdPedidoPDA', type: 'int', nullable: true })
  idPedidoPDA: number | null;

  @Column({ name: 'IdPedidoERP', type: 'nvarchar', length: 50, nullable: true })
  idPedidoERP: string | null;

  @Column({ name: 'IdIvaOPT', type: 'int', nullable: true })
  idIvaOPT: number | null;

  @Column({ name: 'IdIvaPDA', type: 'int', nullable: true })
  idIvaPDA: number | null;

  @Column({ name: 'IdIvaERP', type: 'nvarchar', length: 20, nullable: true })
  idIvaERP: string | null;

  @Column({ name: 'Subtotal', type: 'float', nullable: true })
  subtotal: number | null;

  @Column({ name: 'Dtos', type: 'float', nullable: true })
  dtos: number | null;

  @Column({ name: 'BaseImp', type: 'float', nullable: true })
  baseImp: number | null;

  @Column({ name: 'IvaPor', type: 'float', nullable: true })
  ivaPor: number | null;

  @Column({ name: 'IvaCuota', type: 'float', nullable: true })
  ivaCuota: number | null;

  @Column({ name: 'REPor', type: 'float', nullable: true })
  rePor: number | null;

  @Column({ name: 'RECuota', type: 'float', nullable: true })
  reCuota: number | null;

  @Column({ name: 'ImpuestosTotal', type: 'float', nullable: true })
  impuestosTotal: number | null;

  @Column({ name: 'Total', type: 'float', nullable: true })
  total: number | null;

  @Column({ name: 'FechaInsert', type: 'datetime', nullable: true })
  fechaInsert: Date | null;

  @Column({ name: 'FechaUpdate', type: 'datetime', nullable: true })
  fechaUpdate: Date | null;

  @Column({ name: 'IdAgentePropietario', type: 'int', nullable: true })
  idAgentePropietario: number | null;

  @Column({ name: 'IdRegistroPDA', type: 'int', nullable: true })
  idRegistroPDA: number | null;

  @Column({ name: 'IdAgenteUpdate', type: 'int', nullable: true })
  idAgenteUpdate: number | null;

  @Column({ name: 'TipoDocumento', type: 'char', length: 3, nullable: true })
  tipoDocumento: string | null;

  @Column({ name: 'EstadoImportacion', type: 'nvarchar', length: 2, nullable: true })
  estadoImportacion: string | null;

  @Column({ name: 'BajaEnERP', type: 'bit', nullable: true })
  bajaEnERP: boolean | null;

  @Column({ name: 'GUIDERP', type: 'uniqueidentifier', nullable: true })
  guiderp: string | null;

  @Column({ name: 'IDTAREAINTEGRACION', type: 'nvarchar', length: 50, nullable: true })
  idTareaIntegracion: string | null;

  @Column({ name: 'IdUnicoTablet', type: 'nvarchar', length: 50, nullable: true })
  idUnicoTablet: string | null;

  @Column({ name: 'IdUnicoVentaTablet', type: 'nvarchar', length: 50, nullable: true })
  idUnicoVentaTablet: string | null;

  @Column({ name: 'IdTareaDispositivo', type: 'nvarchar', length: 50, nullable: true })
  idTareaDispositivo: string | null;

  @Column({ name: 'ErroresIntegracion', type: 'nvarchar', length: 4000, nullable: true })
  erroresIntegracion: string | null;

  /** Relación con Pedidos. PedidosTotal.IdPedidoOPT = Pedidos.Id_Pedido */
  @ManyToOne(() => Pedido, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'IdPedidoOPT', referencedColumnName: 'id' })
  pedido: Pedido | null;
}
