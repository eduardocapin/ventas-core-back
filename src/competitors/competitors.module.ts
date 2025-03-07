import { Module } from '@nestjs/common';
import { CompetitorsService } from './competitors.service';
import { CompetitorsController } from './competitors.controller';
import { CompetitorRepository } from './repositories/competitors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RejectsModule } from 'src/rejects/rejects.module';
import { Competitor } from './entities/competitor.entity';
import { CompetitorSegmentationRepository } from './repositories/competitor-segmentation.repository';
import { CompetitorSegmentation } from './entities/competitor-segmentation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Competitor, CompetitorRepository, CompetitorSegmentation, CompetitorSegmentationRepository]), RejectsModule],
  controllers: [CompetitorsController],
  providers: [CompetitorsService, CompetitorRepository, CompetitorSegmentationRepository],
  exports: [CompetitorRepository]
})
export class CompetitorsModule { }
