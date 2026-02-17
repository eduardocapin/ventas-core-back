import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entidad alineada con la tabla [dbo].[MediosPago].
 * Relación con Pedidos: Pedidos.IdMedioPagoOPT = MediosPago.Id.
 */
@Entity('MediosPago')
export class MedioPago {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'IdMedioPagoERP', type: 'nvarchar', length: 50, nullable: true })
  idMedioPagoERP: string | null;

  @Column({ name: 'NombreMedio', type: 'nvarchar', length: 50, nullable: true })
  nombreMedio: string | null;
}
