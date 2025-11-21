import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Empresas' })
export class Empresa {
    @PrimaryGeneratedColumn({ name: 'Id' })
    idEmpresa: number;

    @Column({ name: 'NombreEmpresa' })
    Nombre: string;

}
