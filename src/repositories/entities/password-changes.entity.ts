import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('password_changes')
export class PasswordChanges {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ length: 80 })
  email: string;

  @Column({ length: 15 })
  code: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}