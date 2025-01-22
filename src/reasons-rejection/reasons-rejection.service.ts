import { Injectable } from '@nestjs/common';
import { CreateReasonsRejectionDto } from './dto/create-reasons-rejection.dto';
import { UpdateReasonsRejectionDto } from './dto/update-reasons-rejection.dto';

@Injectable()
export class ReasonsRejectionService {
  create(createReasonsRejectionDto: CreateReasonsRejectionDto) {
    return 'This action adds a new reasonsRejection';
  }

  findAll() {
    return `This action returns all reasonsRejection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reasonsRejection`;
  }

  update(id: number, updateReasonsRejectionDto: UpdateReasonsRejectionDto) {
    return `This action updates a #${id} reasonsRejection`;
  }

  remove(id: number) {
    return `This action removes a #${id} reasonsRejection`;
  }
}
