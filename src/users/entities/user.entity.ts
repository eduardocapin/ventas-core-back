import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('Converter_UsuariosWeb')
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
}