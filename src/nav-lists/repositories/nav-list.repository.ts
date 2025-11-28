import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { ListItem } from "../entities/nav-list.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class NavListsRepository extends Repository<ListItem> {

  private readonly logger = new Logger(NavListsRepository.name);

  constructor(@InjectRepository(ListItem) private readonly repo: Repository<ListItem>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async getContainersByEntity(entity: string, hasUserViewPermission: boolean = false, idioma: string = 'es'): Promise<ListItem[]> {
    const items = await this.repo
      .createQueryBuilder('o')
      .select([
        'g.Id AS containerId',
        'g.Titulo AS groupTitle',
        'o.label AS itemLabel',
        'o.description AS itemDescription',
        'o.type AS itemType',
        'o.route AS itemRoute',
        'o.popup_function_name AS itemPopupFunction',
      ])
      // Unir por id_contenedor (mismo contenedor lógico en todos los idiomas)
      .innerJoin('Converter_ContenedoresConfiguracion', 'g', 'g.id_contenedor = o.Id_Contenedor')
      // Filtrar por entidad solicitada
      .where('o.Entidad = :entity', { entity })
      // Filtrar bajas
      .andWhere('(o.BajaEnERP = 0 OR o.BajaEnERP IS NULL)')
      .andWhere('(g.BajaEnERP = 0 OR g.BajaEnERP IS NULL)')
      // Filtrar idioma tanto en grupo como en item
      .andWhere('g.Idioma = :idioma', { idioma })
      .andWhere('(o.Idioma = :idioma OR o.Idioma IS NULL)', { idioma })
      .orderBy('g.Id', 'ASC')
      .addOrderBy('o.id', 'ASC')
      .getRawMany();

    if (!items.length) {
      this.logger.warn(`No se econtraron contenedores para la entidad: ${entity}`)
      throw new HttpException('No se encontraron contenedores para esta entidad.', HttpStatus.NOT_FOUND);
    }

    // Transformamos los resultados en la estructura esperada
    const containers: { [key: string]: any } = {};

    items.forEach(row => {
      const { containerId, groupTitle, itemLabel, itemDescription, itemType, itemRoute, itemPopupFunction } = row;

      // Filtrar el contenedor ID 5 (Administración de Usuarios) si el usuario no tiene el permiso VISUALIZADO_USUARIOS
      if (containerId === 5 && !hasUserViewPermission) {
        return; // Saltar este item
      }

      if (!containers[groupTitle]) {
        containers[groupTitle] = { 
          id: containerId,
          title: groupTitle,
          items: [] 
        };
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