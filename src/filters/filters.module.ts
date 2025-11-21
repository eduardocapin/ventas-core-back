import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterRepository } from './repositories/filter.repository';
import { SavedFilterRepository } from './repositories/saved-filter.repository';
import { Filter } from './entities/filter.entity';
import { SavedFilter } from './entities/saved-filter.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { ProductsModule } from 'src/products/products.module';
import { SharedModule } from 'src/shared/shared.module';
import { CompetitorRepository } from 'src/competitors/repositories/competitors.repository';
import { ReasonRejectionRepository } from 'src/reasons-rejection/repositories/reasons-rejection.repository';
import { CompetitorsModule } from 'src/competitors/competitors.module';
import { ReasonsRejectionModule } from 'src/reasons-rejection/reasons-rejection.module';
import { Role } from 'src/authorization/entities/role.entity';
import { Permission } from 'src/authorization/entities/permission.entity';
import { RoleRepository } from 'src/authorization/repositories/role.repository';
import { PermissionRepository } from 'src/authorization/repositories/permission.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Filter, FilterRepository, SavedFilter, SavedFilterRepository, Role, Permission, RoleRepository, PermissionRepository]),ClientsModule, ProductsModule, SharedModule, CompetitorsModule, ReasonsRejectionModule ],
  controllers: [FiltersController],
  providers: [FiltersService, FilterRepository, SavedFilterRepository, RoleRepository, PermissionRepository],
})
export class FiltersModule {}
