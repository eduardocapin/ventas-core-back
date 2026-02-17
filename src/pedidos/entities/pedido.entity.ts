import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { PedidoDetalle } from './pedido-detalle.entity';
import { PedidosTotal } from './pedidos-total.entity';
import { MedioPago } from './medio-pago.entity';
import { Client } from '../../clients/entities/client.entity';
import { Empresa } from '../../core/empresas/entities/empresa.entity';

/**
 * Entidad alineada con la tabla [dbo].[Pedidos].
 * PK: Id_Pedido. Relación con líneas: PedidosDetalle.Codigo_PedidoAuto = Pedidos.Id_Pedido.
 * Relación con Clientes: Pedidos.Cod_Agente_Fabricante = Clientes.Id (FK).
 * Relación con PedidosTotal: Pedidos.Id_Pedido = PedidosTotal.IdPedidoOPT (OneToOne).
 */
@Entity('Pedidos')
export class Pedido {
  @PrimaryGeneratedColumn({ name: 'Id_Pedido' })
  id: number;

  @Column({ name: 'TipoDocumento', type: 'char', length: 3, nullable: true })
  tipoDocumento: string | null;

  @Column({ name: 'Referencia_Pedido', type: 'nvarchar', length: 50, nullable: true })
  numero: string | null;

  @Column({ name: 'IdDocumentoPDA', type: 'nvarchar', length: 50, nullable: true })
  idDocumentoPDA: string | null;

  @Column({ name: 'Cliente_N_Comercial', type: 'nvarchar', length: 256, nullable: true })
  cliente: string | null;

  @Column({ name: 'Cod_Cliente_Fabricante', type: 'nvarchar', length: 50, nullable: true })
  codigoCliente: string | null;

  /** Datos de dirección del cliente en el pedido (denormalizados en Pedidos). */
  @Column({ name: 'Cliente_Telefono', type: 'nvarchar', length: 50, nullable: true })
  clienteTelefono: string | null;

  @Column({ name: 'ClienteFax', type: 'nvarchar', length: 50, nullable: true })
  clienteFax: string | null;

  @Column({ name: 'ClienteMail', type: 'nvarchar', length: 256, nullable: true })
  clienteMail: string | null;

  @Column({ name: 'Cliente_DP', type: 'nvarchar', length: 20, nullable: true })
  clienteDP: string | null;

  @Column({ name: 'Cliente_Pobla', type: 'nvarchar', length: 100, nullable: true })
  clientePobla: string | null;

  @Column({ name: 'Cliente_Provin', type: 'nvarchar', length: 100, nullable: true })
  clienteProvin: string | null;

  @Column({ name: 'Cliente_Direc', type: 'nvarchar', length: 500, nullable: true })
  clienteDirec: string | null;

  @Column({ name: 'Agente_Nombre', type: 'nvarchar', length: 55, nullable: true })
  agente: string | null;

  /** Relación con Clientes (agente). Pedidos.Cod_Agente_Fabricante = Clientes.Id */
  @ManyToOne(() => Client, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'Cod_Agente_Fabricante', referencedColumnName: 'id' })
  clienteRelation: Client | null;

  /** Cliente comprador. Pedidos.Cod_Cliente_Fabricante = Clientes.IdClienteFabricante */
  @ManyToOne(() => Client, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'Cod_Cliente_Fabricante', referencedColumnName: 'idClienteFabricante' })
  customerRelation: Client | null;

  @Column({ name: 'Fecha_Pedido', type: 'smalldatetime', nullable: true })
  fecha: Date | null;

  @Column({ name: 'Entrega', type: 'smalldatetime', nullable: true })
  fechaEntrega: Date | null;

  /** Fecha/hora fin (de aquí se extrae la hora de consolidación para el listado). */
  @Column({ name: 'FechaHoraFin', type: 'datetime', nullable: true })
  fechaHoraFin: Date | null;

  @Column({ name: 'AgenciaE', type: 'nvarchar', length: 35, nullable: true })
  delegacion: string | null;

  @Column({ name: 'EstadoImportacion', type: 'nvarchar', length: 2, nullable: true })
  estadoIntegracion: string | null;

  @Column({ name: 'ErroresIntegracion', type: 'nvarchar', length: 4000, nullable: true })
  mensajeErrorIntegracion: string | null;

  @Column({ name: 'Observa', type: 'nvarchar', length: 500, nullable: true })
  observaciones: string | null;

  @Column({ name: 'ObservacionesComerciales', type: 'nvarchar', length: 4000, nullable: true })
  observacionesComerciales: string | null;

  @Column({ name: 'ObservacionesReparto', type: 'nvarchar', length: 4000, nullable: true })
  observacionesReparto: string | null;

  @Column({ name: 'FechaInsert', type: 'datetime', nullable: true })
  insert_date: Date | null;

  @Column({ name: 'FechaUpdate', type: 'datetime', nullable: true })
  update_date: Date | null;

  @Column({ name: 'BajaEnERP', type: 'bit', nullable: true })
  deleted: boolean;

  /** Relación con Empresa: Pedidos.Cod_Empresa = Empresas.Id */
  @Column({ name: 'Cod_Empresa', type: 'int', nullable: true })
  codEmpresa: number | null;

  @ManyToOne(() => Empresa, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'Cod_Empresa', referencedColumnName: 'idEmpresa' })
  empresaRelation: Empresa | null;

  /** Relación con MediosPago: Pedidos.IdMedioPagoOPT = MediosPago.Id */
  @ManyToOne(() => MedioPago, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'IdMedioPagoOPT', referencedColumnName: 'id' })
  medioPagoRelation: MedioPago | null;

  /** Líneas del pedido. Relación: PedidosDetalle.Codigo_PedidoAuto → Pedidos.Id_Pedido */
  @OneToMany(() => PedidoDetalle, (detalle) => detalle.pedido)
  lineas: PedidoDetalle[];

  /** Totales del pedido. Relación: PedidosTotal.IdPedidoOPT = Pedidos.Id_Pedido */
  @OneToOne(() => PedidosTotal, (total) => total.pedido, { nullable: true })
  totales: PedidosTotal | null;
}
