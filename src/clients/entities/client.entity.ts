import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ClientSegmentation } from "./client-segmentation.entity";

@Entity('Clientes')
export class Client {
  @PrimaryGeneratedColumn({name:'id'})
  id: number;

  @Column({ name:'IdClienteFabricante',length: 45, nullable: true })
  customer_ERP_id: string;

  @Column({ name:'Nombre',length: 50 })
  name: string;

  @Column({name:'NombreFiscal', length: 50 })
  tax_name: string;

  @Column({name:'Cif', length: 50 })
  cif: string;

  @Column({ name:'IdProvinciaERP',length: 50, nullable: true })
  province_ERP_id: string;

  @Column({name:'IdProvinciaOPT', type: 'int', nullable: true })
  province_id: number;

  @Column({name:'Provincia', length: 50, nullable: true })
  province: string;

  @Column({name:'IdPoblacionERP', length: 50, nullable: true })
  city_ERP_id: string;

  @Column({name:'IdPoblacionOPT', type: 'int', nullable: true })
  city_id: number;

  @Column({name:'Poblacion', length: 50, nullable: true })
  city: string;

  @Column({ name:'Direccion',length: 80, nullable: true })
  address: string;

  @Column({name:'Telefono', length: 20, nullable: true })
  phone_1: string;

  @Column({name:'Telefono2', length: 20, nullable: true })
  phone_2: string;

  @Column({ name:'Dp',type: 'int', nullable: true })
  pc: number;

  @Column({name:'Mail', length: 50, nullable: true })
  email: string;

  @ManyToOne(() => ClientSegmentation, { nullable: true })
  @JoinColumn([{ name: 'IdSegmentacion1ERP', referencedColumnName: 'segmentation_value_id' }])
  segmentation_1: ClientSegmentation;

  @ManyToOne(() => ClientSegmentation, { nullable: true })
  @JoinColumn([{ name: 'IdSegmentacion2ERP', referencedColumnName: 'segmentation_value_id' }])
  segmentation_2: ClientSegmentation;

  @ManyToOne(() => ClientSegmentation, { nullable: true })
  @JoinColumn([{ name: 'IdSegmentacion3ERP', referencedColumnName: 'segmentation_value_id' }])
  segmentation_3: ClientSegmentation;

  @Column({name:'IdEmpresaERP', length: 45, nullable: true })
  company_ERP_id: string;

  @CreateDateColumn({name:'FechaInsert'})
  insert_date: Date;

  @UpdateDateColumn({name:'FechaUpdate'})
  update_date: Date;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0'})
  deleted: boolean;

  @Column({ name:'Latitud',type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({name:'Longitud', type: 'decimal', precision: 10, scale: 8, nullable: true })
  longitude: number;
}

