import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('customers')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  internal_id: string;

  @Column({ length: 45, nullable: true })
  customer_ERP_id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  tax_name: string;

  @Column({ length: 50 })
  cif: string;

  @Column({ length: 50, nullable: true })
  province_ERP_id: string;

  @Column({ type: 'int', nullable: true })
  province_id: number;

  @Column({ length: 50, nullable: true })
  province: string;

  @Column({ length: 50, nullable: true })
  city_ERP_id: string;

  @Column({ type: 'int', nullable: true })
  city_id: number;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ length: 80, nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  phone_1: string;

  @Column({ length: 20, nullable: true })
  phone_2: string;

  @Column({ type: 'int', nullable: true })
  pc: number;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
  credit: number;

  @Column({ length: 100, nullable: true })
  segmentation_1: string;

  @Column({ length: 100, nullable: true })
  segmentation_2: string;

  @Column({ length: 100, nullable: true })
  segmentation_3: string;

  @Column({ length: 45, nullable: true })
  company_ERP_id: string;

  @CreateDateColumn()
  insert_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ length: 100, nullable: true })
  process_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  longitude: number;
}

