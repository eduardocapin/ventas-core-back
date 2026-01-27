import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private empresasRepository: Repository<Empresa>,
  ) {}

  findAll(): Promise<Empresa[]> {
    return this.empresasRepository.find();
  }
}
