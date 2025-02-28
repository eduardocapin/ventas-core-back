import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('salesmen')
export class Salesman {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  internal_id: string;

  @Column({ length: 45 })
  salesman_ERP_id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  alias: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 50, nullable: true })
  email: string;

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
