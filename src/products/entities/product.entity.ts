import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Articulos')
export class Product {
  @PrimaryGeneratedColumn({name:'IdArticulo'})
  id: number;

  @Column({name:'IdArticuloFabricante', length: 20 })
  product_ERP_id: string;

  @Column({name:'Descripcion', length: 250 })
  product: string;

  @Column({name:'Observaciones',type: 'nvarchar', length: 'MAX'})
  extended_description: string;

  @Column({name:'IdFamiliaERP', type: 'int', nullable: true })
  segmentation_1: number;

  @Column({name:'IdSubFamiliaERP', type: 'int', nullable: true })
  segmentation_2: number;

  @Column({name:'Stock', type: 'int', default: 0 })
  stock: number;

  @Column({name:'Url_Foto', length: 200, nullable: true })
  image: string;
 
  @Column({name:'UnidadMedida', length: 45 })
  sales_unit: string;

  @Column({name:'IdEmpresaERP', length: 45 })
  company_ERP_id: string;

  @CreateDateColumn({name:'FechaInsert'})
  insert_date: Date;

  @UpdateDateColumn({name:'FechaUpdate'})
  update_date: Date;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0' })
  deleted: boolean;

}

