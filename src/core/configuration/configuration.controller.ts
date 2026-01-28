import { Controller, Get, Param } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { Configuracion } from './entities/configuracion.entity';
import { Language } from './entities/language.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Configuration')
@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get('languages')
  @ApiOperation({ summary: 'Obtener idiomas activos' })
  @ApiResponse({ status: 200, description: 'Lista de idiomas activos' })
  async getLanguages(): Promise<{ data: Language[] }> {
    const languages = await this.configurationService.getLanguages();
    return { data: languages };
  }

  @Get('default-language')
  @ApiOperation({ summary: 'Obtener idioma por defecto' })
  @ApiResponse({ status: 200, description: 'Código del idioma por defecto' })
  async getDefaultLanguage(): Promise<{ code: string }> {
    const code = await this.configurationService.getDefaultLanguage();
    return { code };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las configuraciones' })
  findAll(): Promise<Configuracion[]> {
    return this.configurationService.findAll();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Obtener configuración por nombre' })
  findOneByName(@Param('name') name: string): Promise<Configuracion> {
    return this.configurationService.findOneByName(name);
  }
}
