import { Injectable } from '@nestjs/common';
import { NavListsRepository } from './repositories/nav-list.repository';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class NavListsService {

  constructor(
    @InjectRepository(NavListsRepository)
    private readonly navListRepository: NavListsRepository,
  ) {

  }
  async getContainersByEntity(entity: string) {
    return await this.navListRepository.getContainersByEntity(entity)
;

  }



}
