import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('Converter_ClientesSegmentaciones')
export class ClientSegmentation {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'NumeroSegmentacion'})
  segmentation_number: number;

  @Column({name:'Nombre', length: 50 })
  name: string;

  @Column({name:'IdValorSegmentacion', length: 45})
  segmentation_value_id: string;

  @Column({name:'ValorSegmentacion', length: 120 })
  segmentation_value: string;

  @Column({name:'IdEmpresaERP', length: 45 })
  company_ERP_id: string;

  @CreateDateColumn({name:'FechaInsert'})
  insert_date: Date;

  @UpdateDateColumn({name:'FechaUpdate'})
  update_date: Date;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0' })
  deleted: boolean;
}
