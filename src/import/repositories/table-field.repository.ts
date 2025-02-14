import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TableField } from "../entities/table-field.entity";

@Injectable()
export class TableFieldRepository extends Repository<TableField> {
    

    constructor(@InjectRepository(TableField) private readonly repo: Repository<TableField>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getTableFieldsByTableId(table_id:number): Promise<TableField[]> {
        const fields = await this.repo.find({
          where: {
            table_id,
            deleted: false,
          },
        });
      
        if (!fields.length) {
          throw new HttpException('No se encontraron campos para esta tabla.', HttpStatus.NOT_FOUND);
        }
      
        return fields;
      }
    
}