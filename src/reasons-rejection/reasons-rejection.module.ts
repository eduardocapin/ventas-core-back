import { Module } from '@nestjs/common';
import { ReasonsRejectionService } from './reasons-rejection.service';
import { ReasonsRejectionController } from './reasons-rejection.controller';

@Module({
  controllers: [ReasonsRejectionController],
  providers: [ReasonsRejectionService],
})
export class ReasonsRejectionModule {}
