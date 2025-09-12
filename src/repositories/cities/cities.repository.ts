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

    async getFilter(){
      const cities = await this.find({
        where: [
            { deleted: false }, 

        ],
        order: {
            name: 'ASC',
        },
        select: ['id', 'name', ],
    });

    if (!cities.length) {
        this.logger.warn('No se encontraron poblaciones');
        
        throw new HttpException('No se encontraron poblaciones.', HttpStatus.NOT_FOUND);
    }
    
    return cities
    }
    
    
}
