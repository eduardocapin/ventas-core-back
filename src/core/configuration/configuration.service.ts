import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuracion } from './entities/configuracion.entity';
import { Language } from './entities/language.entity';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(Configuracion)
    private configuracionesRepository: Repository<Configuracion>,
    @InjectRepository(Language)
    private languagesRepository: Repository<Language>,
  ) {}

  async findAll(): Promise<any> {
    const configs = await this.configuracionesRepository.find();
    const formattedConfigs = {};
    for (const config of configs) {
      formattedConfigs[config.Nombre] = this.parseValue(String(config.Valor));
    }
    return formattedConfigs;
  }

  private parseValue(value: string): any {
    const trimmedValue = value.trim();
    if (trimmedValue.toLowerCase() === 'true') {
      return true;
    }
    if (trimmedValue.toLowerCase() === 'false') {
      return false;
    }
    // Try to parse as a number
    if (!isNaN(Number(trimmedValue)) && trimmedValue !== '' && !isNaN(parseFloat(trimmedValue))) {
      return Number(trimmedValue);
    }
    return value;
  }

  async findOneByName(nombre: string): Promise<any> {
    const config = await this.configuracionesRepository.findOne({ where: { Nombre: nombre } });
    if (!config) {
      return null;
    }
    return {
      ...config,
      Valor: this.parseValue(config.Valor)
    };
  }

  // Métodos para gestión de idiomas
  async getLanguages(): Promise<Language[]> {
    try {
      const languages = await this.languagesRepository.find({
        where: { active: 1 },
        order: { isDefault: 'DESC' }
      });
      return languages;
    } catch (error) {
      console.error('Error al obtener idiomas de la BD:', error);
      // Si la tabla no existe, devolver idiomas por defecto
      return [
        { code: 'es', name: 'Español', isDefault: 1, active: 1, createdAt: new Date() }
      ] as Language[];
    }
  }

  async getDefaultLanguage(): Promise<string> {
    try {
      const language = await this.languagesRepository.findOne({
        where: { isDefault: 1, active: 1 }
      });
      return language ? language.code : 'es';
    } catch (error) {
      console.error('Error al obtener idioma por defecto:', error);
      return 'es'; // Fallback a español
    }
  }
}
