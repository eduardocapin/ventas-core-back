import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Entidad alineada con la tabla [dbo].[Agentes].
 * PK: Id. Pedidos se relaciona mediante Pedidos.Cod_Agente_Fabricante = Agentes.Id.
 */
@Entity('Agentes')
export class Agente {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Nombre', type: 'nvarchar', length: 100, nullable: true })
  nombre: string | null;

  @Column({ name: 'CodigoAgenteFabricante', type: 'nvarchar', length: 50, nullable: true })
  codigoAgenteFabricante: string | null;

  @Column({ name: 'CodigoAgenteERP', type: 'nvarchar', length: 50, nullable: true })
  codigoAgenteERP: string | null;
}
