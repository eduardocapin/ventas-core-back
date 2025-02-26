import { Module } from '@nestjs/common';
import { RejectsService } from './rejects.service';
import { RejectsController } from './rejects.controller';
import { RejectRepository } from './repositories/rejects.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rejection } from './entities/reject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rejection, RejectRepository]),],
  controllers: [RejectsController],
  providers: [RejectsService, RejectRepository],
})
export class RejectsModule { }
