import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Status } from "../entities/status.entity";

@Injectable()
export class StatusRepository extends Repository<Status> {

    constructor(@InjectRepository(Status) private readonly repo: Repository<Status>, @Inject('LOGGER') private readonly logger) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getFilter() {
        const status = await this.find({
            order: {
                name: 'ASC',
            },
            select: ['id', 'name',],
        });

        if (!status.length) {
            this.logger.warn('No se encontraron estados')
            throw new HttpException('No se encontraron estados.', HttpStatus.NOT_FOUND);
        }

        return status
    }


}
