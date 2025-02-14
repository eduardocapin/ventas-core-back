import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './entities/config.entity';
import { ConfigRepository } from './config/config.repository';
import { PasswordChanges } from './entities/password-changes.entity';
import { PasswordChangesRepository } from './password-changes/password-changes.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Config, ConfigRepository, PasswordChanges, PasswordChangesRepository]),
    ],
    controllers: [],
    providers: [ConfigRepository, PasswordChangesRepository],
    exports: [ConfigRepository, PasswordChangesRepository],
})
export class RepositoriesModule { }
