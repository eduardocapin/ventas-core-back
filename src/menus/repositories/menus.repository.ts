import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { MenuItem } from "../entities/menu.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MenusRepository extends Repository<MenuItem> {

  private readonly logger = new Logger(MenusRepository.name);

  constructor(@InjectRepository(MenuItem) private readonly repo: Repository<MenuItem>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async getMenuItemsByIdAndLanguage(menu_id: number, language: string): Promise<MenuItem[]> {
    const items = await this.repo.find({
      where: {
        menu_id,
        language,
        deleted: false,
      },
    });

    if (!items.length) {
      this.logger.warn(`No se encontraron elementos de menú para el menú con id: ${menu_id} e idioma: ${language}`)
      throw new HttpException('No se encontraron elementos del menú.', HttpStatus.NOT_FOUND);
    }

    return items;
  }

}