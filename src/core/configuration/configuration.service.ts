import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuracion } from './entities/configuracion.entity';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(Configuracion)
    private configuracionesRepository: Repository<Configuracion>,
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
}
