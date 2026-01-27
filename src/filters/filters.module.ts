import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterRepository } from './repositories/filter.repository';
import { SavedFilterRepository } from './repositories/saved-filter.repository';
import { Filter } from './entities/filter.entity';
import { SavedFilter } from './entities/saved-filter.entity';

import { SharedModule } from 'src/shared/shared.module';
import { RoleRepository } from 'src/core/authorization/repositories/role.repository';
import { PermissionRepository } from 'src/core/authorization/repositories/permission.repository';
import { Role } from 'src/core/authorization/entities/role.entity';
import { Permission } from 'src/core/authorization/entities/permission.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Filter, FilterRepository, SavedFilter, SavedFilterRepository, Role, Permission, RoleRepository, PermissionRepository]), SharedModule ],
  controllers: [FiltersController],
  providers: [FiltersService, FilterRepository, SavedFilterRepository, RoleRepository, PermissionRepository],
})
export class FiltersModule {}
