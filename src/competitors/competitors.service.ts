import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompetitorDto } from './dto/create-competitor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RejectRepository } from 'src/rejects/repositories/rejects.repository';
import { CompetitorRepository } from './repositories/competitors.repository';
import { DataSource } from 'typeorm';
import { Competitor } from './entities/competitor.entity';
import { CompetitorSegmentationRepository } from './repositories/competitor-segmentation.repository';

@Injectable()
export class CompetitorsService {

  constructor(
    @InjectRepository(CompetitorRepository)
    private readonly competitorRepository: CompetitorRepository,
    @InjectRepository(RejectRepository)
    private readonly rejectRepository: RejectRepository,
    @InjectRepository(CompetitorSegmentationRepository)
    private readonly competitorSegmentationRepository: CompetitorSegmentationRepository,
    private readonly dataSource: DataSource,
  ) { }
  async create(createCompetitorDto: CreateCompetitorDto) {
    const existingCompetitor = await this.competitorRepository.findByName(createCompetitorDto.nombre)
    console.log(existingCompetitor)
    if (existingCompetitor) {
      throw new HttpException('Comeptidor con nombre ya existente', HttpStatus.BAD_REQUEST);
    }
    return await this.competitorRepository.createCompetitor(createCompetitorDto)
  }


  async findAll() {
    return await this.competitorRepository.findAllWithSegmentations();
  }

  async findOneWithSegmentations(id: number): Promise<Competitor> {
    return await this.competitorRepository.findCompetitorById(id);
  }

  async findOne(id: number): Promise<Competitor> {
    return await this.competitorRepository.findById(id);;
  }

  async findFamiliesByCompetitorId(id: number) {
    return this.competitorRepository.findCompetitorsByFamily(id)
  }

  async updateName(id: number, name: string) {
    const comeptitor = await this.findOne(id);
    if (!comeptitor) {
      throw new HttpException('Comeptidor no encontrado.', HttpStatus.NOT_FOUND);
    }


    const existingComeptitor = await this.competitorRepository.findByName(name);
    if (existingComeptitor && id != existingComeptitor.id) {
      throw new HttpException('Comeptidor con nombre ya existente', HttpStatus.BAD_REQUEST);
    }

    return await this.dataSource.transaction(async (manager) => {
      try {
        const result = await this.competitorRepository.updateComepetitor(comeptitor, name);
        await this.rejectRepository.updateCompetitor(id, name);

        return { status: 'Success', data: result };
      } catch (error) {
        throw new HttpException('Error al actualizar el competidor.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

  async updateSegmentations(id: number, product_segmentation_ids: string[]) {
    const comeptitor = await this.findOne(id);
    if (!comeptitor) {
      throw new HttpException('Comeptidor no encontrado.', HttpStatus.NOT_FOUND);
    }

    return await this.competitorSegmentationRepository.updateCompetitorSegmentations(id, product_segmentation_ids)
    
  }

  async remove(id: number) {
    const comeptitor = await this.findOne(id);
    if (!comeptitor) {
      throw new HttpException('Comeptidor no encontrado.', HttpStatus.NOT_FOUND);
    }
    return this.competitorRepository.removeById(id);

  }
}
