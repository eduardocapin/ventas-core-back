import { Module } from '@nestjs/common';
import { RejectsService } from './rejects.service';
import { RejectsController } from './rejects.controller';
import { RejectRepository } from './repositories/rejects.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rejection } from './entities/reject.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rejection, RejectRepository]), 
    ClientsModule,
    UsersModule
  ],
  controllers: [RejectsController],
  providers: [RejectsService, RejectRepository],
  exports:[RejectRepository]
})
export class RejectsModule { }
