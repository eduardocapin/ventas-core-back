import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Converter_MotivosRechazo')
export class ReasonsRejection {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'CodigoRechazo', length: 10 })
  rejection_code: string;

  @Column({name:'Nombre', length: 50 })
  rejection: string;

  @Column({name:'IdEmpresaERP', length: 45 })
  company_ERP_id: string;

  @CreateDateColumn({name:'FechaInsert'})
  insert_date: Date;

  @UpdateDateColumn({name:'FechaUpdate'})
  update_date: Date;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0' })
  deleted: boolean;


}
