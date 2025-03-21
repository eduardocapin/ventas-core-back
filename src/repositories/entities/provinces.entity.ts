import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('Provincias')
export class Province {
  @PrimaryGeneratedColumn({name: 'IdProvincia'})
  id: number;

  @Column({name:'IdProvinciaERP', length: 50 })
  province_ERP_id: string;

  @Column({name:'Provincia', length: 50 })
  name: string;

  @CreateDateColumn({name:'FechaInsert'})
  insert_date: Date;

  @UpdateDateColumn({name:'FechaUpdate'})
  update_date: Date;

  @Column({ name:'BajaEnERP',type: 'bit', default: () => '0'})
  deleted: boolean;

  @Column({ name:'IdEmpresaERP', length: 50 })
  company_ERP_id: string;
}
