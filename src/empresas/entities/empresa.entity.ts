import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Empresas' })
export class Empresa {
    @PrimaryGeneratedColumn()
    idEmpresa: number;

    @Column()
    Nombre: string;

    @Column()
    Descripcion: string;
}
