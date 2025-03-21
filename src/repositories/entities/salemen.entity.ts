import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('Agentes')
export class Salesman {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'CodigoAgenteFabricante', length: 45 })
  salesman_ERP_id: string;

  @Column({ name:'Nombre', length: 50 })
  name: string;

  @Column({name:'Telefono', length: 20, nullable: true })
  phone: string;

  @Column({ name:'Email',length: 50, nullable: true })
  email: string;

  @Column({name:'IdEmpresaERP' ,length: 45 })
  company_ERP_id: string;

  @CreateDateColumn({name:'FechaInsert'})
  insert_date: Date;

  @UpdateDateColumn({name:'FechaUpdate'})
  update_date: Date;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0'})
  deleted: boolean;

}
