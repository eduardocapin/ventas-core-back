import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Converter_SimbolosAccionCorrectora')
export class Symbol {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'Simbolo', length: 255 })
  symbol: string;
}