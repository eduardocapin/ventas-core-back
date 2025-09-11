import { Inject, Injectable } from '@nestjs/common';
import { CreateImportDto } from './dto/create-import.dto';
import { UpdateImportDto } from './dto/update-import.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TableNameRepository } from './repositories/table-name.repository';
import { TableFieldRepository } from './repositories/table-field.repository';

@Injectable()
export class ImportService {

   constructor(
      @InjectRepository(TableNameRepository)
      private readonly tableNameRepository: TableNameRepository,
      @InjectRepository(TableFieldRepository)
      private readonly tableFieldRepository: TableFieldRepository,
      @Inject('LOGGER') private readonly logger
    ) {
  
    }
  async getImportTablesField(table_id: number) {
    return await this.tableFieldRepository.getTableFieldsByTableId(table_id)
  }

  async getImportTablesName() {
    return await this.tableNameRepository.getTableNames()
  }
  

}
