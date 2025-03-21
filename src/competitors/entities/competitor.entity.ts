import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Competidores')
export class Competitor {
  @PrimaryGeneratedColumn({name: 'Id'})
  id: number;

  @Column({ name: 'Competidor',length: 255 })
  name: string;

  @Column({ name:'BajaEnERP',type: 'bit', default: () => '0'})
  deleted: boolean;
}
