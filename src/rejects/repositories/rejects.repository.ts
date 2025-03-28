import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder, UpdateResult } from "typeorm";
import { Rejection } from "../entities/reject.entity";
import { PaginatedRejectsDto } from "../dto/paginated-reject.dto";
import { Product } from "src/products/entities/product.entity";
import { Client } from "src/clients/entities/client.entity";
import { ProductSegmentation } from "src/products/entities/product-segmentation.entity";
import { KPIsRejectsDto } from "../dto/kpis-rejects.dto";

@Injectable()
export class RejectRepository extends Repository<Rejection> {

    constructor(@InjectRepository(Rejection) private readonly repo: Repository<Rejection>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async findAll(paginatedRejectsDto: PaginatedRejectsDto) {
        let {
            selectedFilters,
            searchTerm,
            currentPage,
            itemsPerPage,
            sortColumn,
            sortDirection,
        } = paginatedRejectsDto;

        console.log(paginatedRejectsDto)
        const query: SelectQueryBuilder<Rejection> = this.createQueryBuilder('r')
            .leftJoin(Product, 'p', 'p.id = r.product_id') // JOIN con productos
            .leftJoin(Client, 'c', 'c.id = r.customer_id') // JOIN con clientes
            .leftJoin(
                ProductSegmentation,
                's1',
                'p.segmentation_1 = s1.segmentation_value_id AND s1.segmentation_number = 1',
            ) // JOIN segmentación 1
            .leftJoin(
                ProductSegmentation,
                's2',
                'p.segmentation_2 = s2.segmentation_value_id AND s2.segmentation_number = 2',
            ) // JOIN segmentación 2
            .where('(r.deleted = 0 OR r.deleted IS NULL)');



        // Seleccionar todos los campos requeridos
        query.select([
            'r.id AS id',
            'r.status_id AS status_id',
            'r.status AS status',
            'r.city_id AS city_id',
            'r.city AS city',
            'r.province_id AS province_id',
            'r.province AS province',
            'r.customer_id AS customer_id',
            'r.customer_name AS customer_name',
            'r.product_id AS product_id',
            'p.product AS product ',
            'r.reason_rejection_id AS reason_rejection_id',
            'r.reason_rejection AS reason_rejection',
            'r.pvp AS pvp',
            'r.has_own_promo AS has_own_promo',
            'r.own_promo AS own_promo',
            'r.pvp_competitor AS pvp_competitor',
            'r.has_competitor_promo AS has_competitor_promo',
            'r.competitor_promo AS competitor_promo',
            'r.competitor_id AS competitor_id',
            'r.competitor_name AS competitor_name',
            'r.corrective_action_value AS corrective_action_value',
            'r.corrective_action_symbol_id AS corrective_action_symbol_id',
            'r.corrective_action_symbol AS corrective_action_symbol',
            'r.corrective_action_text AS corrective_action_text',
            'r.corrective_action_status AS corrective_action_status',
            'r.corrective_action_status_id AS corrective_action_status_id',
            'ISNULL(r.salesman_proposal, \'\') AS salesman_proposal',
            'r.notes AS notes',
            'FORMAT(r.rejection_date, \'dd/MM/yy\') AS rejection_date',
            'FORMAT(r.last_rejection_date, \'dd/MM/yy\') AS last_rejection_date',
            'FORMAT(r.interest_date, \'dd/MM/yy\') AS interest_date',
            'r.latitude AS latitude',
            'r.longitude AS longitude',
            'r.deleted AS deleted',
            's1.segmentation_value AS family',
            's1.segmentation_value_id AS family_id',
            's2.segmentation_value AS subfamily',
        ]);
        // Aplicar filtros dinámicos
        if (selectedFilters && Array.isArray(selectedFilters)) {
            selectedFilters.forEach((filter, index) => {
                const { id, valor, tipo } = filter;

                if (tipo === 'multi-select' && Array.isArray(valor)) {
                    // Usamos un parámetro único basado en el índice para evitar sobrescribir valores
                    query.andWhere(`${id} IN (:...values${index})`, { [`values${index}`]: valor.map(v => v.id) });
                } else if (tipo === 'search' && typeof valor === 'string') {
                    query.andWhere(`${id} LIKE :search${index}`, { [`search${index}`]: `%${valor}%` });
                } else if (tipo === 'date' && valor?.startDate && valor?.endDate) {
                    query.andWhere(`${id} BETWEEN :start${index} AND :end${index}`, {
                        [`start${index}`]: valor.startDate,
                        [`end${index}`]: valor.endDate,
                    });
                } else if (tipo === 'range' && valor?.min && valor?.max) {
                    query.andWhere(`${id} BETWEEN :min${index} AND :max${index}`, {
                        [`min${index}`]: valor.min,
                        [`max${index}`]: valor.max,
                    });
                }
            });
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
            query.addOrderBy(`${sortColumn}`, sortDirection.toUpperCase() as 'ASC' | 'DESC');
        }

        // Obtener total de elementos antes de paginar
        const totalItems = await query.clone().getCount();
        // Aplicar paginación
        query.limit(itemsPerPage).offset((currentPage - 1) * itemsPerPage);
        const items = await query.getRawMany();
        return { items, totalItems };
    }

    async findById(id: number): Promise<Rejection> {
        return await this.repo.findOne({ where: { id, deleted: false } });
    }

    async removeById(id: number): Promise<UpdateResult> {
        return await this.repo.update(id, { deleted: true });
    }

    async updateReasonsRejection(id: number, nombre: string): Promise<UpdateResult> {
        return await this.repo.update({ reason_rejection_id: id }, { reason_rejection: nombre })
    }

    async updateCompetitor(id: number, nombre: string): Promise<UpdateResult> {
        return await this.repo.update({ competitor_id: id }, { competitor_name: nombre })
    }

    async getRejectionKPIs(KPIsRejectsDto: KPIsRejectsDto) {
        let { selectedFilters, searchTerm } = KPIsRejectsDto;

        const query: SelectQueryBuilder<Rejection> = this.createQueryBuilder('r')
            .leftJoin(Product, 'p', 'p.id = r.product_id')
            .leftJoin(Client, 'c', 'c.id = r.customer_id')
            .leftJoin(
                ProductSegmentation,
                's1',
                'p.segmentation_1 = s1.segmentation_value_id AND s1.segmentation_number = 1',
            )
            .leftJoin(
                ProductSegmentation,
                's2',
                'p.segmentation_2 = s2.segmentation_value_id AND s2.segmentation_number = 2',
            )
            .where('(r.deleted = 0 OR r.deleted IS NULL)');

        // Aplicar filtros dinámicos
        if (selectedFilters && Array.isArray(selectedFilters)) {
            selectedFilters.forEach((filter, index) => {
                const { id, valor, tipo } = filter;

                if (tipo === 'multi-select' && Array.isArray(valor)) {
                    query.andWhere(`${id} IN (:...values${index})`, { [`values${index}`]: valor.map(v => v.id) });
                } else if (tipo === 'search' && typeof valor === 'string') {
                    query.andWhere(`${id} LIKE :search${index}`, { [`search${index}`]: `%${valor}%` });
                } else if (tipo === 'date' && valor?.startDate && valor?.endDate) {
                    query.andWhere(`${id} BETWEEN :start${index} AND :end${index}`, {
                        [`start${index}`]: valor.startDate,
                        [`end${index}`]: valor.endDate,
                    });
                } else if (tipo === 'range' && valor?.min && valor?.max) {
                    query.andWhere(`${id} BETWEEN :min${index} AND :max${index}`, {
                        [`min${index}`]: valor.min,
                        [`max${index}`]: valor.max,
                    });
                }
            });
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

        // Clonar la query base para reutilizarla en diferentes cálculos
        const baseQuery = query.clone();

        // Obtener el número total de rechazos
        const totalRejections = await baseQuery.getCount();

        let rejectionByReason = [];
        let pendingRejections = 0;
        let opportunityRejections = 0;
        let totalGroupedConversions = 0;
        let conversionsByStatus = [];

        // Ejecutar todas las consultas en paralelo
        if (totalRejections > 0) {
            // Ejecutar consultas en paralelo solo si hay registros
            [rejectionByReason, pendingRejections, opportunityRejections, totalGroupedConversions] = await Promise.all([
                baseQuery.clone()
                    .select([
                        'r.reason_rejection AS reason',
                        'COUNT(*) AS count',
                        `ROUND((COUNT(*) * 100.0 / ${totalRejections}), 2) AS percentage`,
                    ])
                    .groupBy('r.reason_rejection')
                    .getRawMany(),
                baseQuery.clone().andWhere('r.status_id = 5').getCount(),
                baseQuery.clone().andWhere('r.status_id = 4').getCount(),
                baseQuery.clone().andWhere('r.status_id IN (1, 2, 3, 6)').getCount(),
            ]);
        
            // Ejecutar esta consulta solo si hay totalGroupedRejections
            if (totalGroupedConversions > 0) {
                conversionsByStatus = await baseQuery.clone()
                    .select([
                        'r.status AS status',
                        'COUNT(*) AS count',
                        `ROUND((COUNT(*) * 100.0 / NULLIF(${totalGroupedConversions}, 0)), 2) AS percentage`,
                    ])
                    .andWhere('r.status_id IN (1, 2, 3, 6)')
                    .groupBy('r.status')
                    .getRawMany();
            }
        }
        
        return {
            totalRejections,
            rejectionByReason,
            pendingRejections,
            opportunityRejections,
            totalGroupedConversions,
            conversionsByStatus,
        };

    }
}