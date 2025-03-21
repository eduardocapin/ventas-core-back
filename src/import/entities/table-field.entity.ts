import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Converter_CamposTablaImportador')
export class TableField {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'Id_TablaImportador', type: 'int' })
  table_id: number;

  @Column({ name:'NombreCampoReal',length: 45 })
  real_field_name: string;

  @Column({name:'NombreCampoAVisualizar', length: 45 })
  show_field_name: string;

  @Column({ name:'Obligatorio',type: 'bit', default: () => '0' })
  required: boolean;

  @Column({ name:'BajaEnERP',type: 'bit', default: () => '0' })
  deleted: boolean;
}