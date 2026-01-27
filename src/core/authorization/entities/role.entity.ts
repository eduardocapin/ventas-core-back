import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from 'src/core/users/entities/user.entity';

@Entity('Roles')
export class Role {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'Nombre', length: 50, unique: true })
  nombre: string;

  @Column({ name: 'Descripcion', length: 255, nullable: true })
  descripcion: string;

  // Relación Many-to-Many con Permission a través de RolesPermisos
  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable({
    name: 'RolesPermisos',
    joinColumn: { name: 'Rol_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'Permiso_id', referencedColumnName: 'id' }
  })
  permissions: Permission[];

  // Relación Many-to-Many con User a través de UsuariosRoles
  @ManyToMany(() => User, user => user.roles)
  users: User[];
}
