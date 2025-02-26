import { Module } from '@nestjs/common';
import { CompetitorsService } from './competitors.service';
import { CompetitorsController } from './competitors.controller';
import { CompetitorRepository } from './repositories/competitors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RejectsModule } from 'src/rejects/rejects.module';
import { Competitor } from './entities/competitor.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Competitor, CompetitorRepository]),RejectsModule ],
  controllers: [CompetitorsController],
  providers: [CompetitorsService, CompetitorRepository],
})
export class CompetitorsModule {}
