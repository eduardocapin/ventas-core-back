import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateFilterDto } from './dto/create-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { SavedFilter } from './entities/saved-filter.entity';
import { SavedFilterRepository } from './repositories/saved-filter.repository';
import { FilterRepository } from './repositories/filter.repository';
import { PermissionRepository } from 'src/core/authorization/repositories/permission.repository';
import { RoleRepository } from 'src/core/authorization/repositories/role.repository';

@Injectable()
export class FiltersService {

  private readonly logger = new Logger(FiltersService.name);

  constructor(
    @InjectRepository(SavedFilterRepository)
    private readonly savedFilterRepository: SavedFilterRepository,
    @InjectRepository(FilterRepository)
    private readonly filterRepository: FilterRepository,
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
    @InjectRepository(PermissionRepository)
    private readonly permissionRepository: PermissionRepository

  ) { }

  async findOne(id: number): Promise<SavedFilter> {
    return await this.savedFilterRepository.findById(id);
  }

  async removeSaved(id: number) {
    const filter = await this.findOne(id);
    if (!filter) {
      this.logger.warn(`Filtro guardado con id ${id} no encontrado`)
      throw new HttpException('Filtro no encontrado.', HttpStatus.NOT_FOUND);
    }
    return await this.savedFilterRepository.removeById(id);
  }

  async createSavedByComponetId(componentId: string, email: string, createFilterDto: CreateFilterDto) {
    
    const { filtros, nombre } = createFilterDto;

    const existingFilter = await this.savedFilterRepository.findByNameCompenetIdEmail(componentId,email, nombre);
    if (existingFilter) {
      this.logger.warn(`Filtro guardado con nombre(${nombre}) ya existente`)
      throw new HttpException('Filtro con nombre ya existente' ,HttpStatus.BAD_REQUEST);
    }

    return await this.savedFilterRepository.createSavedFilter({
      email: email,
      name: nombre,
      component_id: componentId,
      filters: JSON.stringify(filtros)
    });

  }

  async getSavedByComponetId(componentId: string, email: string) {
   return await this.savedFilterRepository.findByIdAndEmail(componentId, email);
  }

  async findFiltersByComponetId(componentId: string) {
    return await this.filterRepository.findByCompenentId(componentId);
  }

  async getRoles() {
    return await this.roleRepository.getFilter();
  }

  async getPermissions() {
    return await this.permissionRepository.getFilter();
  }

  async getFilterConfig(componentId: string) {
    // Configuración según el componente
    const configs = {
      'dashboard-general': {
        empresaFieldName: 'r.empresa_id'
      },
      'rechazos-general': {
        empresaFieldName: 'r.empresa_id'
      },
      'clients-general': {
        empresaFieldName: 'c.empresa_id'
      },
      'users-global': {
        empresaFieldName: null // No aplica para usuarios
      },
    };

    const config = configs[componentId];
    if (!config) {
      this.logger.warn(`Configuración no encontrada para componentId: ${componentId}`)
      // Retornar configuración por defecto
      return {
        empresaFieldName: 'r.empresa_id'
      };
    }

    return config;
  }


}
