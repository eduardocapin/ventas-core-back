import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder, UpdateResult } from "typeorm";
import { Client } from "../entities/client.entity";
import { PaginatedClientsDto } from "../dto/paginated-client.dto";


@Injectable()
export class ClientRepository extends Repository<Client> {


    constructor(@InjectRepository(Client) private readonly repo: Repository<Client>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async removeById(id: number): Promise<UpdateResult> {
        return await this.repo.update(id, { deleted: false });
    }

    async findClientById(id: number): Promise<Client> {
        return await this.repo.findOne({ where: { id, deleted: false } });
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
            selectedFilters.forEach((filter) => {
                const { id, valor, tipo } = filter;
                if (tipo === 'multi-select' && Array.isArray(valor)) {
                    query.andWhere(`cu.${id} IN (:...values)`, { values: valor.map((v) => v.id) });
                } else if (tipo === 'search' && typeof valor === 'string') {
                    query.andWhere(`cu.${id} LIKE :searchValue`, { searchValue: `%${valor}%` });
                } else if (tipo === 'date' && valor?.startDate && valor?.endDate) {
                    query.andWhere(`cu.${id} BETWEEN :startDate AND :endDate`, {
                        startDate: valor.startDate,
                        endDate: valor.endDate,
                    });
                } else if (tipo === 'range' && valor?.min !== undefined && valor?.max !== undefined) {
                    query.andWhere(`cu.${id} BETWEEN :min AND :max`, {
                        min: valor.min,
                        max: valor.max,
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
        query.skip((currentPage - 1) * itemsPerPage).take(itemsPerPage);

        const items = await query.getMany();
        return { items, totalItems };
    }

}

