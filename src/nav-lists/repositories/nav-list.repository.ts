import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ListItem } from "../entities/nav-list.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class NavListsRepository extends Repository<ListItem> {


  constructor(@InjectRepository(ListItem) private readonly repo: Repository<ListItem>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async getContainersByEntity(entity: string): Promise<ListItem[]> {
    const items = await this.repo
      .createQueryBuilder('o')
      .select([
        'g.Titulo AS groupTitle',
        'o.label AS itemLabel',
        'o.description AS itemDescription',
        'o.type AS itemType',
        'o.route AS itemRoute',
        'o.popup_function_name AS itemPopupFunction',
      ])
      .innerJoin('Converter_ContenedoresConfiguracion', 'g', 'g.id = o.container_id')
      .where('(o.deleted = 0 OR o.deleted IS NULL)')
      .andWhere('(g.BajaEnERP = 0 OR g.BajaEnERP IS NULL)')
      .orderBy('g.Id', 'ASC')
      .addOrderBy('o.id', 'ASC')
      .getRawMany();

    if (!items.length) {
      throw new HttpException('No se encontraron contenedores para esta entidad.', HttpStatus.NOT_FOUND);
    }

    // Transformamos los resultados en la estructura esperada
    const containers: { [key: string]: any } = {};

    items.forEach(row => {
      const { groupTitle, itemLabel, itemDescription, itemType, itemRoute, itemPopupFunction } = row;

      if (!containers[groupTitle]) {
        containers[groupTitle] = { title: groupTitle, items: [] };
      }

      const listItem = {
        label: itemLabel,
        description: itemDescription,
        type: itemType,
        route: itemType === 'route' ? itemRoute : undefined,
        popupFunction: itemType === 'popup' ? itemPopupFunction : undefined,
      };

      containers[groupTitle].items.push(listItem);
    });

    return Object.values(containers);
  }
}