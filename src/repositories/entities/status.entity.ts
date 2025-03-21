import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Converter_EstadosRechazo')
export class Status {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'Nombre', length: 255 })
  name: string;
}