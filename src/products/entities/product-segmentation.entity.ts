import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('product_segmentations')
export class ProductSegmentation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  internal_id: string;

  @Column()
  segmentation_number: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  segmentation_value_id: number;

  @Column({ length: 120 })
  segmentation_value: string;

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
