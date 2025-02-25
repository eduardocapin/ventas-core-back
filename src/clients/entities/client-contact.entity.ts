import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('customers_contacts')
export class ClientContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  internal_id: string;

  @Column({ length: 45 })
  customer_ERP_id: string;

  @Column({ type: 'int' })
  customer_id: number;

  @Column({ length: 45 })
  contact_ERP_id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 20, nullable: true })
  phone_1: string;

  @Column({ length: 20, nullable: true })
  phone_2: string;

  @Column({ length: 50, nullable: true })
  email: string;

  @CreateDateColumn()
  insert_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @Column({ length: 50 })
  company_ERP_id: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ length: 100, nullable: true })
  process_id: string;
}