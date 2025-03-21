import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Converter_TextosEnlaces')
export class ListItem {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'Id_Contenedor', type: 'int' })
  container_id: number;

  @Column({name:'Entidad', length: 45 })
  container_entity: string;

  @Column({name:'Etiqueta', length: 45 })
  label: string;

  @Column({name:'Descripcion', length: 255, nullable: true })
  description: string;

  @Column({name:'Tipo', length: 45 })
  type: string;

  @Column({name:'Ruta', length: 255, nullable: true })
  route: string;

  @Column({name:'FuncionPopup', length: 255, nullable: true })
  popup_function_name: string;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0'})
  deleted: boolean;
}