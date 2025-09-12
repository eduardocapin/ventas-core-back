import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Filter } from "../entities/filter.entity";
import { HttpException, HttpStatus, Inject, Logger } from "@nestjs/common";

export class FilterRepository extends Repository<Filter> {

    private readonly logger = new Logger(FilterRepository.name);
    
    constructor(@InjectRepository(Filter) private readonly repo: Repository<Filter>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async findByCompenentId(id: string) {
        const filters = await this.repo.find({ where: { component_id: id, deleted: false } });
        if (!filters.length) {
            this.logger.warn(`No se han encontrado filtro para el componentId: ${id}`)
            throw new HttpException('No se encontraron Filtros', HttpStatus.NOT_FOUND);
        }
        return filters.map((filter) => ({
            ...filter,
            id: filter.field,
            optionsEndpoint: filter.options_endpoint,
        }));
    }



}