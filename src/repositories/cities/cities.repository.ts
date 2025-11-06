import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { City } from "../entities/cities.entity";


@Injectable()
export class CityRepository extends Repository<City> {

    private readonly logger = new Logger(CityRepository.name);

    constructor(@InjectRepository(City) private readonly repo: Repository<City>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getFilter() {
        /*
      const cities = await this.find({
        where: [
            { deleted: false }, 

        ],
        order: {
            name: 'ASC',
        },
        select: ['id', 'name', ],
    });
    */
        const cities = await this.createQueryBuilder('city')
            .select([
                'DISTINCT city.city_ERP_id AS id',
                'city.name AS name',
            ])
            .where('city.deleted = :deleted', { deleted: false })
            .orderBy('city.name', 'ASC')
            .getRawMany();
        if (!cities.length) {
            throw new HttpException('No se encontraron poblaciones.', HttpStatus.NOT_FOUND);
        }

        return cities
    }


}
