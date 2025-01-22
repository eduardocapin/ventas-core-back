import { Injectable } from '@nestjs/common';
import { CreateCompetitorDto } from './dto/create-competitor.dto';
import { UpdateCompetitorDto } from './dto/update-competitor.dto';

@Injectable()
export class CompetitorsService {
  create(createCompetitorDto: CreateCompetitorDto) {
    return 'This action adds a new competitor';
  }

  findAll() {
    return `This action returns all competitors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} competitor`;
  }

  update(id: number, updateCompetitorDto: UpdateCompetitorDto) {
    return `This action updates a #${id} competitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} competitor`;
  }
}
