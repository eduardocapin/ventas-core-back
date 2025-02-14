import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('competitors')
export class Competitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
