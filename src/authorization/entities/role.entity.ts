import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('Converter_Roles')
export class Role {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'Nombre', length: 50, unique: true })
  nombre: string;

  @Column({ name: 'Descripcion', length: 255, nullable: true })
  descripcion: string;

  // Relación Many-to-Many con Permission a través de Converter_RolesPermisos
  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable({
    name: 'Converter_RolesPermisos',
    joinColumn: { name: 'Rol_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'Permiso_id', referencedColumnName: 'id' }
  })
  permissions: Permission[];

  // Relación Many-to-Many con User a través de Converter_UsuariosRoles
  @ManyToMany(() => User, user => user.roles)
  users: User[];
}
