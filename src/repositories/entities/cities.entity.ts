import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('Poblaciones')
export class City {
  @PrimaryGeneratedColumn({name:'IdPoblacion'})
  id: number;

  @Column({name:'IdPoblacionERP', length: 45 })
  city_ERP_id: string;

  @Column({name:'Poblacion', length: 45 })
  name: string;

  @Column({name:'IdEmpresaERP', length: 45 })
  company_ERP_id: string;

  @CreateDateColumn({name:'FechaInsert'})
  insert_date: Date;

  @UpdateDateColumn({name:'FechaUpdate'})
  update_date: Date;

  @Column({name:'BajaEnERP',type: 'bit', default: () => '0' })
  deleted: boolean;

  
}
