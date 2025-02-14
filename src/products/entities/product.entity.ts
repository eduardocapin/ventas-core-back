import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  internal_id: string;

  @Column({ length: 20 })
  product_ERP_id: string;

  @Column({ length: 80 })
  product: string;

  @Column('longtext')
  extended_description: string;

  @Column({ length: 80, nullable: true })
  family: string;

  @Column({ length: 80, nullable: true })
  subfamily: string;

  @Column({ type: 'int', nullable: true })
  segmentation_1: number;

  @Column({ type: 'int', nullable: true })
  segmentation_2: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ length: 200, nullable: true })
  image: string;

  @Column({ length: 200, nullable: true })
  url: string;

  @Column({ length: 45 })
  sales_unit: string;

  @Column({ length: 45 })
  company_ERP_id: string;

  @CreateDateColumn()
  insert_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ length: 100, nullable: true })
  process_id: string;
}

