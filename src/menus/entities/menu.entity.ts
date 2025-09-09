import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Converter_Menus')
export class MenuItem {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({ name:'IdMenu',type: 'int' })
  menu_id: number;

  @Column({name:'IdMenuPadre', type: 'int', nullable: true })
  parent_menu_id: number;

  @Column({ name:'Icono',length: 255, nullable: true })
  icon: string;

  @Column({name:'Etiqueta', length: 45 })
  label: string;

  @Column({name:'Ruta', length: 45 })
  route: string;

  @Column({name:'TineSubMenu',type: 'bit', default: () => '0' })
  has_submenu: boolean;

  @Column({name:'Idioma', length: 45 })
  language: string;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0' })
  deleted: boolean;
}
