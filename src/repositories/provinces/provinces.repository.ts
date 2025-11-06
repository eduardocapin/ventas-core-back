import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Province } from "../entities/provinces.entity";

@Injectable()
export class ProvinceRepository extends Repository<Province> {

    private readonly logger = new Logger(ProvinceRepository.name);
    
    constructor(@InjectRepository(Province) private readonly repo: Repository<Province>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getFilter() {
        /*
        const provinces = await this.find({
            where: [
                { deleted: false },

            ],
            order: {
                name: 'ASC',
            },
            select: ['id', 'name',],
        });
        */
    const provinces = await this.createQueryBuilder('province')
            .select([
                'DISTINCT province.province_ERP_id AS id',
                'province.name AS name',
            ])
            .where('province.deleted = :deleted', { deleted: false })
            .orderBy('province.name', 'ASC')
            .getRawMany();
        if (!provinces.length) {
            throw new HttpException('No se encontraron poblaciones.', HttpStatus.NOT_FOUND);
        }

        return provinces
    }


}
