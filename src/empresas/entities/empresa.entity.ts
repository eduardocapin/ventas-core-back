import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

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
