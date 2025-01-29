import { Injectable } from '@nestjs/common';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';

@Injectable()
export class FiltersService {
  removeSaved(id: number) {
    throw new Error('Method not implemented.');
  }
  createSavedByComponetId(componentId: string, createFilterDto: CreateFilterDto) {
    throw new Error('Method not implemented.');
  }
  getSavedByComponetId(componentId: string) {
    throw new Error('Method not implemented.');
  }
  getProductSegmentation(n: string) {
    throw new Error('Method not implemented.');
  }

  getSegmentation(n: string) {
    throw new Error('Method not implemented.');
  }
  findFiltersByComponetId(componentId: string) {
    throw new Error('Method not implemented.');
  }
  getSalesmen() {
    throw new Error('Method not implemented.');
  }
  getCompetitors() {
    throw new Error('Method not implemented.');
  }
  getReasonsRejection() {
    throw new Error('Method not implemented.');
  }
  getSymbol() {
    throw new Error('Method not implemented.');
  }
  getStatus() {
    throw new Error('Method not implemented.');
  }
  getCities() {
    throw new Error('Method not implemented.');
  }
  getProvinces() {
    throw new Error('Method not implemented.');
  }
  create(createFilterDto: CreateFilterDto) {
    return 'This action adds a new filter';
  }

  findAll() {
    return `This action returns all filters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filter`;
  }

  update(id: number, updateFilterDto: UpdateFilterDto) {
    return `This action updates a #${id} filter`;
  }

  remove(id: number) {
    return `This action removes a #${id} filter`;
  }
}
