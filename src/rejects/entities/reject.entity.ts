import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rejections')
export class Rejection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  status_id: number;

  @Column({ length: 45 })
  status: string;

  @Column({ type: 'int' })
  city_id: number;

  @Column({ length: 45 })
  city: string;

  @Column({ type: 'int' })
  province_id: number;

  @Column({ length: 45 })
  province: string;

  @Column({ type: 'int' })
  customer_id: number;

  @Column({ length: 150 })
  customer_name: string;

  @Column({ type: 'int' })
  product_id: number;

  @Column({ length: 45 })
  product_name: string;

  @Column({ type: 'int' })
  reason_rejection_id: number;

  @Column({ length: 45 })
  reason_rejection: string;

  @Column({ type: 'double' })
  pvp: number;

  @Column({ type: 'boolean', default: false })
  has_own_promo: boolean;

  @Column({ length: 45, nullable: true })
  own_promo: string;

  @Column({ type: 'double', nullable: true })
  pvp_competitor: number;

  @Column({ type: 'boolean', default: false })
  has_competitor_promo: boolean;

  @Column({ length: 45, nullable: true })
  competitor_promo: string;

  @Column({ type: 'int', nullable: true })
  competitor_id: number;

  @Column({ length: 45, nullable: true })
  competitor_name: string;

  @Column({ type: 'double', nullable: true })
  corrective_action_value: number;

  @Column({ type: 'int', nullable: true })
  corrective_action_symbol_id: number;

  @Column({ length: 45, nullable: true })
  corrective_action_symbol: string;

  @Column({ length: 45, nullable: true })
  corrective_action_text: string;

  @Column({ length: 45, nullable: true })
  corrective_action_status: string;

  @Column({ type: 'int', nullable: true })
  corrective_action_status_id: number;

  @Column({ type: 'boolean', default: false })
  corrective_action_sent: boolean;

  @Column({ length: 45, nullable: true })
  salesman_proposal: string;

  @Column({ length: 45, nullable: true })
  notes: string;

  @Column({ type: 'date', nullable: true })
  rejection_date: Date;

  @Column({ type: 'date', nullable: true })
  last_rejection_date: Date;

  @Column({ type: 'date', nullable: true })
  interest_date: Date;

  @Column({ type: 'int', nullable: true })
  salesman_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  longitude: number;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}

