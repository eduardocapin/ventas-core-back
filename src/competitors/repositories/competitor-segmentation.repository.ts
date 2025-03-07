import { Repository, EntityRepository } from 'typeorm';
import { CompetitorSegmentation } from '../entities/competitor-segmentation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(CompetitorSegmentation)
export class CompetitorSegmentationRepository extends Repository<CompetitorSegmentation> {

    constructor(@InjectRepository(CompetitorSegmentation) private readonly repo: Repository<CompetitorSegmentation>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async updateCompetitorSegmentations(competitorId: number, segmentationIds: number[]) {
        await this.repo.update(
            { competitor_id: competitorId, deleted: false },
            { deleted: true },
        );
        const newSegmentations = segmentationIds.map((segmentationId) => {
            return this.repo.create({
                competitor_id: competitorId,
                product_segmentation_id: segmentationId,
                deleted: false,
            });
        });
        await this.save(newSegmentations, { chunk: segmentationIds.length });
    }
}