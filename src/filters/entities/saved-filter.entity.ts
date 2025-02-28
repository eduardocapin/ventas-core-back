import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('saved_filters')
export class SavedFilter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  component_id: string;

  @Column({ length: 255 })
  name: string;

  @Column('longtext')
  filters: string;

  @Column({ length: 255 })
  email: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
