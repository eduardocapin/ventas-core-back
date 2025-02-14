import { Module } from '@nestjs/common';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';
import { TableFieldRepository } from './repositories/table-field.repository';
import { TableNameRepository } from './repositories/table-name.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableField } from './entities/table-field.entity';
import { ImportTableName } from './entities/table-name.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TableField, TableFieldRepository, ImportTableName, TableNameRepository]),],
  controllers: [ImportController],
  providers: [ImportService, TableFieldRepository, TableNameRepository],
})
export class ImportModule { }
