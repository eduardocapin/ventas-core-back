import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRejectDto } from './dto/create-reject.dto';
import { UpdateRejectDto } from './dto/update-reject.dto';
import { UpdateRejectCorrectiveActionDto } from './dto/update-reject-corrective-action.dto';
import { PaginatedRejectsDto } from './dto/paginated-reject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RejectRepository } from './repositories/rejects.repository';
import { Rejection } from './entities/reject.entity';
import { KPIsRejectsDto } from './dto/kpis-rejects.dto';

@Injectable()
export class RejectsService {
  constructor(
    @InjectRepository(RejectRepository)
    private readonly rejectRepository: RejectRepository) {

  }
  async updateCorrectiveAction(id: number, updateRejectCorrectiveActionDto: UpdateRejectCorrectiveActionDto) {
    const rejection = await this.findOne(id);
    if (!rejection) {
      throw new HttpException('Rechazo no encontrado.', HttpStatus.NOT_FOUND);
    }

    const updatedRejection = { ...rejection, ...updateRejectCorrectiveActionDto };

    const result = await this.rejectRepository.save(updatedRejection);

    return { status: 'Success', data: result };
  }

  async findAll(paginatedRejectsDto: PaginatedRejectsDto): Promise<{ items: Rejection[]; totalItems: number }> {
    return await this.rejectRepository.findAll(paginatedRejectsDto);
  }

  async KPIs(KPIsRejectsDto: KPIsRejectsDto) {
    return await this.rejectRepository.getRejectionKPIs(KPIsRejectsDto)
  }

  async findOne(id: number): Promise<Rejection> {
    return await this.rejectRepository.findById(id);
  }

  async update(id: number, updateRejectDto: UpdateRejectDto) {
    const rejection = await this.findOne(id);
    if (!rejection) {
      throw new HttpException('Rechazo no encontrado.', HttpStatus.NOT_FOUND);
    }
    const updatedRejection = { ...rejection, ...updateRejectDto };

    const result = await this.rejectRepository.save(updatedRejection);

    return { status: 'Success', data: result };
  }

  async remove(id: number) {
    const rejection = await this.findOne(id);
    if (!rejection) {
      throw new HttpException('Rechazo no encontrado.', HttpStatus.NOT_FOUND);
    }
    return this.rejectRepository.removeById(id);
  }
}
