import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Converter_SegmentacionesCompetidor')
export class CompetitorSegmentation {
  @PrimaryColumn({name:'Id_Competidor'})
  competitor_id: number;

  @PrimaryColumn({name:'Id_SegmentacionProducto'})
  product_segmentation_id: string;

  @Column({name:'BajaEnERP', type: 'bit', default: () => '0' })
  deleted: boolean;
}
