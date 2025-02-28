import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  internal_id: string;

  @Column({ length: 45 })
  city_ERP_id: string;

  @Column({ length: 45 })
  name: string;

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
