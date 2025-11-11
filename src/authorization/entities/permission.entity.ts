import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('Converter_Permisos')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'Nombre', length: 50, unique: true })
  nombre: string;

  @Column({ name: 'Descripcion', length: 255, nullable: true })
  descripcion: string;

  // Relación Many-to-Many con Role
  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];

  // Relación Many-to-Many con User a través de Converter_UsuariosPermisos
  @ManyToMany(() => User, user => user.permissions)
  users: User[];
}
