import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ImportTableName } from "../entities/table-name.entity";

@Injectable()
export class TableNameRepository extends Repository<ImportTableName> {

  private readonly logger = new Logger(TableNameRepository.name);

  constructor(@InjectRepository(ImportTableName) private readonly repo: Repository<ImportTableName>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async getTableNames(): Promise<ImportTableName[]> {
    const tableNames = await this.repo.find({
      where: {
        deleted: false,
      },
    });

    if (!tableNames.length) {
      this.logger.warn('No se encontraron tablas para importar')
      throw new HttpException('No se encontraron tablas.', HttpStatus.NOT_FOUND);
    }
    return tableNames;
  }

}