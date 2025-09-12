import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCompetitorDto } from './dto/create-competitor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RejectRepository } from 'src/rejects/repositories/rejects.repository';
import { CompetitorRepository } from './repositories/competitors.repository';
import { DataSource } from 'typeorm';
import { Competitor } from './entities/competitor.entity';
import { CompetitorSegmentationRepository } from './repositories/competitor-segmentation.repository';

@Injectable()
export class CompetitorsService {

  private readonly logger = new Logger(CompetitorsService.name);

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
    this.logger.debug(`Competidor existente: ${existingCompetitor}`)
    if (existingCompetitor) {
      this.logger.warn(`Competidor con nombre ${name} ya existente`)
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
      this.logger.warn(`Competidor con id ${id} no encontrado`)
      throw new HttpException('Comeptidor no encontrado.', HttpStatus.NOT_FOUND);
    }


    const existingComeptitor = await this.competitorRepository.findByName(name);
    if (existingComeptitor && id != existingComeptitor.id) {
      this.logger.warn(`Competidor con nombre ${name} ya existente`)
      throw new HttpException('Comeptidor con nombre ya existente', HttpStatus.BAD_REQUEST);
    }

    return await this.dataSource.transaction(async (manager) => {
      try {
        const result = await this.competitorRepository.updateComepetitor(comeptitor, name);
        await this.rejectRepository.updateCompetitor(id, name);

        return { status: 'Success', data: result };
      } catch (error) {
        this.logger.error(`Error al actualizar el competidor(${id}): ${error}`)
        throw new HttpException('Error al actualizar el competidor.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

  async updateSegmentations(id: number, product_segmentation_ids: string[]) {
    const comeptitor = await this.findOne(id);
    if (!comeptitor) {
      this.logger.warn(`Competidor con id ${id} no encontrado`)
      throw new HttpException('Comeptidor no encontrado.', HttpStatus.NOT_FOUND);
    }

    return await this.competitorSegmentationRepository.updateCompetitorSegmentations(id, product_segmentation_ids)
    
  }

  async remove(id: number) {
    const comeptitor = await this.findOne(id);
    if (!comeptitor) {
      this.logger.warn(`Competidor con id ${id} no encontrado`)
      throw new HttpException('Comeptidor no encontrado.', HttpStatus.NOT_FOUND);
    }
    return this.competitorRepository.removeById(id);

  }
}
