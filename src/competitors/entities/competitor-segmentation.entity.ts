import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('competitor_segmentations')
export class CompetitorSegmentation {
  @PrimaryColumn()
  competitor_id: number;

  @PrimaryColumn()
  product_segmentation_id: number;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
