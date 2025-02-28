import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('symbols')
export class Symbol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  symbol: string;
}