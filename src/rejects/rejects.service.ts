import { Injectable } from '@nestjs/common';
import { CreateRejectDto } from './dto/create-reject.dto';
import { UpdateRejectDto } from './dto/update-reject.dto';

@Injectable()
export class RejectsService {
  create(createRejectDto: CreateRejectDto) {
    return 'This action adds a new reject';
  }

  findAll() {
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
