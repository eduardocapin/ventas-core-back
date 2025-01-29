import { Injectable } from '@nestjs/common';
import { CreateRejectDto } from './dto/create-reject.dto';
import { UpdateRejectDto } from './dto/update-reject.dto';
import { UpdateRejectCorrectiveActionDto } from './dto/update-reject-corrective-action.dto';
import { PaginatedRejectsDto } from './dto/paginated-reject.dto';

@Injectable()
export class RejectsService {
  updateCorrectiveAction(id: number, updateRejectCorrectiveActionDto: UpdateRejectCorrectiveActionDto) {
    throw new Error('Method not implemented.');
  }
  create(createRejectDto: CreateRejectDto) {
    return 'This action adds a new reject';
  }

  findAll( paginatedRejectsDto: PaginatedRejectsDto) {
    return `This action returns all rejects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reject`;
  }

  update(id: number, updateRejectDto: UpdateRejectDto) {
    return `This action updates a #${id} reject`;
  }

  remove(id: number) {
    return `This action removes a #${id} reject`;
  }
}
