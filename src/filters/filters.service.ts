import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateFilterDto } from './dto/create-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetitorRepository } from 'src/competitors/repositories/competitors.repository';
import { ReasonRejectionRepository } from 'src/reasons-rejection/repositories/reasons-rejection.repository';

import { SavedFilter } from './entities/saved-filter.entity';
import { SavedFilterRepository } from './repositories/saved-filter.repository';
import { FilterRepository } from './repositories/filter.repository';
import { ClientSegmentationRepository } from 'src/clients/repositories/client-segmentations.repository';
import { ProductSegmentationRepository } from 'src/products/repositories/product-segmentation.repository';
import { CityRepository } from 'src/repositories/cities/cities.repository';
import { ProvinceRepository } from 'src/repositories/provinces/provinces.repository';
import { StatusRepository } from 'src/repositories/status/status.repository';
import { SymbolRepository } from 'src/repositories/symbol/symbol.repository';
import { Salesman } from 'src/repositories/entities/salemen.entity';
import { SalesmanRepository } from 'src/repositories/salesmen/salesmen.repository';

@Injectable()
export class FiltersService {

  constructor(
    @InjectRepository(CompetitorRepository)
    private readonly competitorRepository: CompetitorRepository,
    @InjectRepository(ReasonRejectionRepository)
    private readonly reasonRejectionRepository: ReasonRejectionRepository,
    @InjectRepository(SavedFilterRepository)
    private readonly savedFilterRepository: SavedFilterRepository,
    @InjectRepository(FilterRepository)
    private readonly filterRepository: FilterRepository,
    @InjectRepository(ClientSegmentationRepository)
    private readonly clientSegmentationRepository: ClientSegmentationRepository,
    @InjectRepository(ProductSegmentationRepository)
    private readonly productSegmentationRepository: ProductSegmentationRepository,
    @InjectRepository(CityRepository)
    private readonly cityRepository: CityRepository,
    @InjectRepository(ProvinceRepository)
    private readonly provinceRepository: ProvinceRepository,
    @InjectRepository(StatusRepository)
    private readonly statusRepository: StatusRepository,
    @InjectRepository(SymbolRepository)
    private readonly symbolRepository: SymbolRepository,
    @InjectRepository(SalesmanRepository)
    private readonly salesmanRepository: SalesmanRepository,
    @Inject('LOGGER') private readonly logger

  ) { }

  async findOne(id: number): Promise<SavedFilter> {
    return await this.savedFilterRepository.findById(id);
  }

  async removeSaved(id: number) {
    const filter = await this.findOne(id);
    if (!filter) {
      throw new HttpException('Filtro no encontrado.', HttpStatus.NOT_FOUND);
    }
    return await this.savedFilterRepository.removeById(id);
  }

  async createSavedByComponetId(componentId: string, email: string, createFilterDto: CreateFilterDto) {
    
    const { filtros, nombre } = createFilterDto;

    const existingFilter = await this.savedFilterRepository.findByNameCompenetIdEmail(componentId,email, nombre);
    if (existingFilter) {
      throw new HttpException('Filtro con nombre ya existente' ,HttpStatus.BAD_REQUEST);
    }

    return await this.savedFilterRepository.createSavedFilter({
      email: email,
      name: nombre,
      component_id: componentId,
      filters: JSON.stringify(filtros)
    });

  }

  async getSavedByComponetId(componentId: string, email: string) {
   return await this.savedFilterRepository.findByIdAndEmail(componentId, email);
  }

  async findFiltersByComponetId(componentId: string) {
    return await this.filterRepository.findByCompenentId(componentId);
  }

  async getProductSegmentation(n: number) {
    return await this.productSegmentationRepository.getFilter(n)
  }

 async getSegmentation(n: number) {
    return await this.clientSegmentationRepository.getFilter(n)
  }

  async getSalesmen() {
    return await this.salesmanRepository.getFilter()
  }
  async getCompetitors() {
    return await this.competitorRepository.getFilter()
  }
  async getReasonsRejection() {
    return await this.reasonRejectionRepository.getFilter()
  }
  async getSymbol() {
    return await this.symbolRepository.getFilter()
  }
  async getStatus() {
    return await this.statusRepository.getFilter()
  }
  async getCities() {
    return await this.cityRepository.getFilter()
  }
  async getProvinces() {
    return await this.provinceRepository.getFilter()
  }


}
