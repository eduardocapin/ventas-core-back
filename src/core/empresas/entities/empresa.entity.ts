import { User } from "src/core/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Empresas' })
export class Empresa {
    @PrimaryGeneratedColumn({ name: 'Id' })
    idEmpresa: number;

    @Column({ name: 'NombreEmpresa' })
    Nombre: string;

    // Relación inversa con User
    @ManyToMany(() => User, user => user.empresas)
    users: User[];
}
