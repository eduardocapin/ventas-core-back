import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from 'src/authorization/entities/role.entity';
import { Permission } from 'src/authorization/entities/permission.entity';

@Entity('UsuariosWeb')
export class User {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'Nombre', length: 255 })
  name: string;

  @Column({name:'Email', length: 255, unique: true })
  email: string;

  @Column({name:'Password', length: 255 })
  password: string;

  @Column({name:'Cargo', length: 45, nullable: true })
  position_company: string;

  @UpdateDateColumn({name:'FechaUpdate'})
  update_date: Date;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0' })
  deleted: boolean;

  @Column({name:'Imagen', length: 250, nullable: true })
  image: string;

  // Relación Many-to-Many con Role a través de UsuariosRoles
  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'UsuariosRoles',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' }
  })
  roles: Role[];

  // Relación Many-to-Many con Permission a través de UsuariosPermisos
  @ManyToMany(() => Permission, permission => permission.users)
  @JoinTable({
    name: 'UsuariosPermisos',
    joinColumn: { name: 'Usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'Permiso_id', referencedColumnName: 'id' }
  })
  permissions: Permission[];
}