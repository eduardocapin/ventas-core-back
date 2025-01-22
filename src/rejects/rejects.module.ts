import { Module } from '@nestjs/common';
import { RejectsService } from './rejects.service';
import { RejectsController } from './rejects.controller';

@Module({
  controllers: [RejectsController],
  providers: [RejectsService],
})
export class RejectsModule {}
