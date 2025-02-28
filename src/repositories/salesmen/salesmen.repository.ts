import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Salesman } from "../entities/salemen.entity";

@Injectable()
export class SalesmanRepository extends Repository<Salesman> {

    constructor(@InjectRepository(Salesman) private readonly repo: Repository<Salesman>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getFilter(){
      const salesmen = await this.find({
        where: [
            { deleted: false }, 

        ],
        order: {
            name: 'ASC',
        },
        select: ['id', 'name', ],
    });

    if (!salesmen.length) {
        throw new HttpException('No se encontraron vendedores.', HttpStatus.NOT_FOUND);
    }
    
    return salesmen
    }
    
    
}
