import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Converter_FiltrosGuardados')
export class SavedFilter {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'IdComponente', length: 45 })
  component_id: string;

  @Column({name:'Nombre', length: 255 })
  name: string;

  @Column({name:'Filtros', type: 'nvarchar', length: 'MAX'})
  filters: string;

  @Column({name:'Email', length: 255 })
  email: string;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0' })
  deleted: boolean;
}
