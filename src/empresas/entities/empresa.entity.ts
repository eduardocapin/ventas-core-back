import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Empresas' })
export class Empresa {
    @PrimaryGeneratedColumn({ name: 'id' })
    idEmpresa: number;

    @Column({ name: 'NombreEmpresa' })
    Nombre: string;

    @Column({name: 'Descripcion'})
    Descripcion: string;
}
