import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Converter_TablasImportador')
export class ImportTableName {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'NombreTablaReal', length: 45 })
  real_table_name: string;

  @Column({name:'NombreTablaAVisualizar', length: 45 })
  show_table_name: string;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0' })
  deleted: boolean;
}