import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Converter_Configuracion')
export class Config {
    @PrimaryGeneratedColumn({name:'Id'})
    id: number;

    @Column({name:'Argumento', length: 50 })
    argument: string;

    @Column({name:'Descripcion', length: 500 })
    description: string;

    @Column({name:'Origen', length: 20 })
    origin: string;

    @Column({name:'Variable', length: 500 })
    variable: string;

    @Column({name:'BajaEnERP', type: 'bit', default: () => '0'})
    deleted: boolean;
}
