import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Province } from "../entities/provinces.entity";

@Injectable()
export class ProvinceRepository extends Repository<Province> {

    constructor(@InjectRepository(Province) private readonly repo: Repository<Province>, @Inject('LOGGER') private readonly logger) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getFilter() {
        const provinces = await this.find({
            where: [
                { deleted: false },

            ],
            order: {
                name: 'ASC',
            },
            select: ['id', 'name',],
        });

        if (!provinces.length) {
            this.logger.warn('No se encontraron provincias')
            throw new HttpException('No se encontraron provincias.', HttpStatus.NOT_FOUND);
        }

        return provinces
    }


}
