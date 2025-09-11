import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Symbol } from "../entities/symbol.entity";


@Injectable()
export class SymbolRepository extends Repository<Symbol> {

    constructor(@InjectRepository(Symbol) private readonly repo: Repository<Symbol>, @Inject('LOGGER') private readonly logger) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getFilter() {
        const symbols = await this.find({
            order: {
                symbol: 'ASC',
            },
            select: ['id', 'symbol',],
        });

        if (!symbols.length) {
            this.logger.warn('No se encontraron simbolos')
            throw new HttpException('No se encontraron simbolos.', HttpStatus.NOT_FOUND);
        }

        return symbols
    }


}
