import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuracion } from './entities/configuracion.entity';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Configuracion])],
  providers: [ConfigurationService],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}
