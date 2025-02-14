import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('import_tables_fields')
export class TableField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  table_id: number;

  @Column({ length: 45 })
  real_field_name: string;

  @Column({ length: 45 })
  show_field_name: string;

  @Column({ type: 'boolean', default: false })
  required: boolean;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}