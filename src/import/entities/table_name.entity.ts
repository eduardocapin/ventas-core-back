import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('import_tables_names')
export class ImportTableName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  real_table_name: string;

  @Column({ length: 45 })
  show_table_name: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}