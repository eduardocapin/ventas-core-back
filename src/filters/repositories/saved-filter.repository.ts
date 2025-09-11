import { Repository, UpdateResult } from "typeorm";
import { SavedFilter } from "../entities/saved-filter.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Inject } from "@nestjs/common";

export class SavedFilterRepository extends Repository<SavedFilter> {



    constructor(@InjectRepository(SavedFilter) private readonly repo: Repository<SavedFilter>, @Inject('LOGGER') private readonly logger) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async createSavedFilter(filterData: Partial<SavedFilter>) {
        const filter = this.create(filterData);
        return await this.save(filter);
    }

    async removeById(id: number): Promise<UpdateResult> {
        return await this.repo.update(id, { deleted: true });
    }

    async findById(id: number): Promise<SavedFilter> {
        return await this.repo.findOne({ where: { id, deleted: false } });
    }

    async findByNameCompenetIdEmail(componentId: any, email: string, nombre: string) {
        return await this.repo.findOne({ where: { name: nombre, component_id: componentId, email: email, deleted: false } });
    }

    async findByIdAndEmail(componentId: string, email: string) {
        const filters = await this.repo.find({ where: { component_id: componentId, email: email, deleted: false } });

        return filters.map((filter) => ({
            id: filter.id,
            nombre: filter.name,
            filtros: JSON.parse(filter.filters),
        }));
        ;
    }


}