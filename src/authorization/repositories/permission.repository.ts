import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionRepository extends Repository<Permission> {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {
    super(
      permissionRepository.target,
      permissionRepository.manager,
      permissionRepository.queryRunner,
    );
  }

  /**
   * Obtener todos los permisos
   */
  async findAllPermissions(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  /**
   * Obtener un permiso por ID
   */
  async findById(id: number): Promise<Permission | null> {
    return this.permissionRepository.findOne({ where: { id } });
  }

  /**
   * Obtener un permiso por nombre
   */
  async findByName(nombre: string): Promise<Permission | null> {
    return this.permissionRepository.findOne({ where: { nombre } });
  }

  /**
   * Obtener múltiples permisos por IDs
   */
  async findByIds(ids: number[]): Promise<Permission[]> {
    return this.permissionRepository.findByIds(ids);
  }

  /**
   * Verificar si un permiso existe por nombre
   */
  async existsByName(nombre: string): Promise<boolean> {
    const count = await this.permissionRepository.count({ where: { nombre } });
    return count > 0;
  }
}
