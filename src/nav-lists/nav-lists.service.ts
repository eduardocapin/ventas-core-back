import { Inject, Injectable, Logger } from '@nestjs/common';
import { NavListsRepository } from './repositories/nav-list.repository';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class NavListsService {

  private readonly logger = new Logger(NavListsService.name);

  constructor(
    @InjectRepository(NavListsRepository)
    private readonly navListRepository: NavListsRepository
  ) {

  }
  async getContainersByEntity(entity: string, hasUserViewPermission: boolean = false) {
    return await this.navListRepository.getContainersByEntity(entity, hasUserViewPermission);
  }



}
