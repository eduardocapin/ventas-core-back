import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('list_items')
export class ListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  container_id: number;

  @Column({ length: 45 })
  container_entity: string;

  @Column({ length: 45 })
  label: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ length: 45 })
  type: string;

  @Column({ length: 255, nullable: true })
  route: string;

  @Column({ length: 255, nullable: true })
  popup_function_name: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}