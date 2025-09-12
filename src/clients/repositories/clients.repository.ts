import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder, UpdateResult } from "typeorm";
import { Client } from "../entities/client.entity";
import { PaginatedClientsDto } from "../dto/paginated-client.dto";
import { ClientSegmentation } from "../entities/client-segmentation.entity";
import { FilterDto } from "src/filters/dto/filter.dto";


@Injectable()
export class ClientRepository extends Repository<Client> {

    private readonly logger = new Logger(ClientRepository.name);
    constructor(@InjectRepository(Client) private readonly repo: Repository<Client>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async removeById(id: number): Promise<UpdateResult> {
        return await this.repo.update(id, { deleted: true });
    }

    async findClientById(id: number) {
        const cliente = await this.repo.createQueryBuilder("client")
            .leftJoinAndSelect("client.segmentation_1", "segmentacion1")
            .leftJoinAndSelect("client.segmentation_2", "segmentacion2")
            .leftJoinAndSelect("client.segmentation_3", "segmentacion3")
            .where("client.id = :id", { id })
            .andWhere("client.deleted = 0 OR client.deleted IS NULL")
            .getOne();

        console.log(cliente);
        this.logger.debug(cliente)
        return cliente;
    }

    async findAll(paginatedClientsDto: PaginatedClientsDto): Promise<{ items: Client[]; totalItems: number }> {
        const {
            selectedFilters,
            searchTerm,
            currentPage,
            itemsPerPage,
            sortColumn,
            sortDirection,
        } = paginatedClientsDto;

        const query: SelectQueryBuilder<Client> = this.createQueryBuilder('cu')
            .where('(cu.deleted = 0 OR cu.deleted IS NULL)');

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
        if (searchTerm && typeof searchTerm === 'string' && searchTerm.trim() !== '') {
            query.andWhere(
                `(
              cu.name LIKE :searchTerm OR
              cu.cif LIKE :searchTerm OR
              cu.city LIKE :searchTerm OR
              cu.address LIKE :searchTerm OR
              cu.email LIKE :searchTerm OR
              cu.customer_ERP_id LIKE :searchTerm
            )`,
                { searchTerm: `%${searchTerm}%` },
            );
        }

        // Aplicar ordenación
        if (sortColumn && sortDirection) {
            query.orderBy(`cu.${sortColumn}`, sortDirection.toUpperCase() === 'ASC' ? 'ASC' : 'DESC');
        }

        // Contar total de elementos antes de la paginación
        const totalItems = await query.getCount();

        // Aplicar paginación
        query.limit(itemsPerPage).offset((currentPage - 1) * itemsPerPage);

        const items = await query.getMany();
        this.logger.debug(`TOTAL Clientes:${items.length}`)
        console.log(`TOTAL Clientes:${items.length}`)
        return { items, totalItems };
    }


    async getCount(selectedFilters: FilterDto[], searchTerm: string = null) {

        const query: SelectQueryBuilder<Client> = this.createQueryBuilder('c')
            .where('(c.deleted = 0 OR c.deleted IS NULL)');

        // Aplicar filtros dinámicos
        if (selectedFilters && Array.isArray(selectedFilters)) {
            selectedFilters.forEach((filter, index) => {
                const { id, valor, tipo } = filter;
                // Solo aplicar el filtro si el id empieza con "c." es decir es filtro de cliente
                if (!id.startsWith('c.')) {
                    return;
                }
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
        if (searchTerm && typeof searchTerm === 'string' && searchTerm.trim() !== '') {
            query.andWhere(
                `(
              c.name LIKE :searchTerm OR
              c.cif LIKE :searchTerm OR
              c.city LIKE :searchTerm OR
              c.address LIKE :searchTerm OR
              c.email LIKE :searchTerm OR
              c.customer_ERP_id LIKE :searchTerm
            )`,
                { searchTerm: `%${searchTerm}%` },
            );
        }
        const totalItems = await query.getCount();
        return totalItems;
    }
}

