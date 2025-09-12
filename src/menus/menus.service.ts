import { Inject, Injectable, Logger } from '@nestjs/common';
import { MenusRepository } from './repositories/menus.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenusService {

  private readonly logger = new Logger(MenusService.name);
  
  constructor(
    @InjectRepository(MenusRepository)
    private readonly menusRepository: MenusRepository
  ) {

  }

  async getMenuItems(menu_id: number, language: string) {
    return await this.menusRepository.getMenuItemsByIdAndLanguage(menu_id, language)
  }

}
