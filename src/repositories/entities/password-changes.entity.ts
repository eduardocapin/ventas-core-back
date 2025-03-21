import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Converter_CambiosPassword')
export class PasswordChanges {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'IdUsuario', type: 'int' })
  user_id: number;

  @Column({name:'Email', length: 80 })
  email: string;

  @Column({name:'Codigo', length: 15 })
  code: string;

  @Column({name:'Fecha', type: 'datetime' })
  date: Date;

  @Column({name:'Activo', type: 'bit', default: () => '1' })
  active: boolean;
}