import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ListItem } from "../entities/nav-list.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class NavListsRepository extends Repository<ListItem> {
    getContainersByEntity(entity: string) {
      throw new Error('Method not implemented.');
    }
    

    constructor(@InjectRepository(ListItem) private readonly repo: Repository<ListItem>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getMenuItemsByIdAndLanguage(entity:string): Promise<ListItem[]> {
            const items = await this.repo.find({
              where: {
                container_entity: entity,
                deleted: false,
              },
            });
          
            if (!items.length) {
              throw new HttpException('No se encontraron contenedores para esta entidad.', HttpStatus.NOT_FOUND);
            }
          
            return items;
          }
    
}