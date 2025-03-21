import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Converter_Filtros')
export class Filter {
  @PrimaryGeneratedColumn({name:'Id'})
  id: number;

  @Column({name:'Componente', length: 45 })
  component_id: string;

  @Column({name:'CampoFiltrado', length: 45 })
  field: string;

  @Column({name:'Tipo', length: 45 })
  type: string;

  @Column({name:'Titulo', length: 45 })
  title: string;
  
  @Column({name:'OrigenDeDatos', length: 45 })
  options_endpoint: string;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0'})
  deleted: boolean;
}
