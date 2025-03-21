import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('ContactosClientes')
export class ClientContact {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({name:'IdClienteFabricante', length: 45 })
  customer_ERP_id: string;

  @Column({name:'IdCliente', type: 'int' })
  customer_id: number;

  @Column({name:'IdContactoERP', length: 45 })
  contact_ERP_id: string;

  @Column({name:'Nombre',length: 50 })
  name: string;

  @Column({name:'Telefono', length: 20, nullable: true })
  phone_1: string;

  @Column({name:'Movil', length: 20, nullable: true })
  phone_2: string;

  @Column({name:'Email', length: 50, nullable: true })
  email: string;

  @CreateDateColumn({name:'FechaInsert',})
  insert_date: Date;

  @UpdateDateColumn({name:'FechaUpdate',})
  update_date: Date;

  @Column({name:'IdEmpresaERP', length: 50 })
  company_ERP_id: string;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0' })
  deleted: boolean;

}