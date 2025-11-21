import { Controller, Get, Param } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { Configuracion } from './entities/configuracion.entity';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get()
  findAll(): Promise<Configuracion[]> {
    return this.configurationService.findAll();
  }

  @Get(':name')
  findOneByName(@Param('name') name: string): Promise<Configuracion> {
    return this.configurationService.findOneByName(name);
  }
}
