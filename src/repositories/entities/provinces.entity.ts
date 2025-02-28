import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  internal_id: string;

  @Column({ length: 50 })
  province_ERP_id: string;

  @Column({ length: 50 })
  name: string;

  @CreateDateColumn()
  insert_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ length: 100, nullable: true })
  process_id: string;

  @Column({ length: 50 })
  company_ERP_id: string;
}
