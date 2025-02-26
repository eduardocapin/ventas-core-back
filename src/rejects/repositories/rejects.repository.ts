import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder, UpdateResult } from "typeorm";
import { Rejection } from "../entities/reject.entity";
import { PaginatedRejectsDto } from "../dto/paginated-reject.dto";

@Injectable()
export class RejectRepository extends Repository<Rejection> {

    constructor(@InjectRepository(Rejection) private readonly repo: Repository<Rejection>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async findAll(paginatedRejectsDto: PaginatedRejectsDto) {
        const {
            selectedFilters,
            searchTerm,
            currentPage,
            itemsPerPage,
            sortColumn,
            sortDirection,
        } = paginatedRejectsDto;

        const query: SelectQueryBuilder<Rejection> = this.createQueryBuilder('r')
            .leftJoinAndSelect('r.product', 'p')
            .leftJoinAndSelect('r.customer', 'c')
            .leftJoinAndSelect('p.segmentation1', 's1')
            .leftJoinAndSelect('p.segmentation2', 's2')
            .where('(r.deleted = 0 OR r.deleted IS NULL)');

        // Aplicar filtros dinámicos
        if (selectedFilters && Array.isArray(selectedFilters)) {
            for (const filter of selectedFilters) {
                const { id, valor, tipo } = filter;
                if (tipo === 'multi-select' && Array.isArray(valor)) {
                    query.andWhere(`r.${id} IN (:...values)`, { values: valor.map(v => v.id) });
                } else if (tipo === 'search' && typeof valor === 'string') {
                    query.andWhere(`r.${id} LIKE :search`, { search: `%${valor}%` });
                } else if (tipo === 'date' && valor?.startDate && valor?.endDate) {
                    query.andWhere(`r.${id} BETWEEN :start AND :end`, {
                        start: valor.startDate,
                        end: valor.endDate,
                    });
                } else if (tipo === 'range' && valor?.min && valor?.max) {
                    query.andWhere(`r.${id} BETWEEN :min AND :max`, {
                        min: valor.min,
                        max: valor.max,
                    });
                }
            }
        }

        // Aplicar búsqueda global
        if (searchTerm && typeof searchTerm === 'string') {
            query.andWhere(
                `(r.status LIKE :search OR r.city LIKE :search OR r.province LIKE :search OR
              r.customer_name LIKE :search OR p.product LIKE :search OR
              s1.segmentation_value LIKE :search OR s2.segmentation_value LIKE :search OR
              r.reason_rejection LIKE :search OR r.pvp LIKE :search OR r.own_promo LIKE :search OR
              r.pvp_competitor LIKE :search OR r.competitor_promo LIKE :search OR
              r.competitor_name LIKE :search OR r.corrective_action_value LIKE :search OR
              r.corrective_action_symbol LIKE :search OR r.corrective_action_status LIKE :search OR
              r.salesman_proposal LIKE :search OR r.notes LIKE :search)`,
                { search: `%${searchTerm}%` },
            );
        }

        // Aplicar ordenamiento
        if (sortColumn && sortDirection) {
            query.orderBy(`r.${sortColumn}`, sortDirection.toUpperCase() as 'ASC' | 'DESC');
        }

        // Obtener total de elementos antes de paginar
        const totalItems = await query.getCount();

        // Aplicar paginación
        const items = await query
            .skip((currentPage - 1) * itemsPerPage)
            .take(itemsPerPage)
            .getMany();

        return { items, totalItems };
    }

    async findById(id: number): Promise<Rejection> {
        return await this.repo.findOne({ where: { id, deleted: false } });
    }

    async removeById(id: number): Promise<UpdateResult> {
        return await this.repo.update(id, { deleted: false });
    }

    async updateReasonsRejection(id: number, nombre: string): Promise<UpdateResult> {
        return await this.repo.update({ reason_rejection_id: id }, { reason_rejection: nombre })
    }

    async updateCompetitor(id: number, nombre: string): Promise<UpdateResult> {
        return await this.repo.update({ competitor_id: id }, { competitor_name: nombre })
    }
}