import { Permission } from 'src/core/authorization/entities/permission.entity';
import { Role } from 'src/core/authorization/entities/role.entity';
import { Empresa } from 'src/core/empresas/entities/empresa.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

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

  @Column({name:'Idioma', type: 'nvarchar', length: 10, nullable: true})
  idioma: string;

  

  // Many-to-Many con Role a través de UsuariosRoles
  @ManyToMany(() => Role, role => role.users)
  @JoinTable({
    name: 'UsuariosRoles',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' }
  })
  roles: Role[];

  // Many-to-Many con Permission a través de UsuariosPermisos
  @ManyToMany(() => Permission, permission => permission.users)
  @JoinTable({
    name: 'UsuariosPermisos',
    joinColumn: { name: 'Usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'Permiso_id', referencedColumnName: 'id' }
  })
  permissions: Permission[];

  //Many-to-Many con Empresa a través de UsuariosEmpresas
  @ManyToMany(() => Empresa, empresa => empresa.users)
  @JoinTable({
    name: 'UsuariosEmpresas',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'empresa_id', referencedColumnName: 'idEmpresa' }
  })
  empresas: Empresa[];
}