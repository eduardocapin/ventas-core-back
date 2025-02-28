import { Module } from '@nestjs/common';
import { ReasonsRejectionService } from './reasons-rejection.service';
import { ReasonsRejectionController } from './reasons-rejection.controller';
import { ReasonRejectionRepository } from './repositories/reasons-rejection.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReasonsRejection } from './entities/reasons-rejection.entity';
import { RejectsModule } from 'src/rejects/rejects.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReasonsRejection, ReasonRejectionRepository]),RejectsModule ],
  controllers: [ReasonsRejectionController],
  providers: [ReasonsRejectionService, ReasonRejectionRepository],
  exports:[ReasonRejectionRepository]
})
export class ReasonsRejectionModule {}
