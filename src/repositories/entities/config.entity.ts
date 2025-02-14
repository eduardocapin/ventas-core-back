import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('configuration')
export class Config {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    argument: string;

    @Column({ length: 500 })
    description: string;

    @Column({ length: 20 })
    origin: string;

    @Column({ length: 500 })
    variable: string;

    @Column({ type: 'boolean', default: false })
    deleted: boolean;
}
