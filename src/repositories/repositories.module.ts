import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './entities/config.entity';
import { ConfigRepository } from './config/config.repository';
import { PasswordChanges } from './entities/password-changes.entity';
import { PasswordChangesRepository } from './password-changes/password-changes.repository';
import { City } from './entities/cities.entity';
import { CityRepository } from './cities/cities.repository';
import { Province } from './entities/provinces.entity';
import { ProvinceRepository } from './provinces/provinces.repository';
import { Status } from './entities/status.entity';
import { StatusRepository } from './status/status.repository';
import { Symbol } from './entities/symbol.entity';
import { SymbolRepository } from './symbol/symbol.repository';
import { SalesmanRepository } from './salesmen/salesmen.repository';
import { Salesman } from './entities/salemen.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Config, ConfigRepository, PasswordChanges, PasswordChangesRepository, City, CityRepository, Province, ProvinceRepository, Status, StatusRepository, Symbol, SymbolRepository, Salesman, SalesmanRepository]),
    ],
    controllers: [],
    providers: [ConfigRepository, PasswordChangesRepository, CityRepository, ProvinceRepository, StatusRepository, SymbolRepository, SalesmanRepository],
    exports: [ConfigRepository, PasswordChangesRepository, CityRepository, ProvinceRepository, StatusRepository, SymbolRepository, SalesmanRepository],
})
export class RepositoriesModule { }
