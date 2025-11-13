import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
    super(
      roleRepository.target,
      roleRepository.manager,
      roleRepository.queryRunner,
    );
  }

  /**
   * Obtener todos los roles con sus permisos
   */
  async findAllWithPermissions(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: ['permissions'],
    });
  }

  /**
   * Obtener un rol por ID con sus permisos
   */
  async findByIdWithPermissions(id: number): Promise<Role | null> {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  /**
   * Obtener un rol por nombre con sus permisos
   */
  async findByNameWithPermissions(nombre: string): Promise<Role | null> {
    return this.roleRepository.findOne({
      where: { nombre },
      relations: ['permissions'],
    });
  }

  /**
   * Verificar si un rol existe por nombre
   */
  async existsByName(nombre: string): Promise<boolean> {
    const count = await this.roleRepository.count({ where: { nombre } });
    return count > 0;
  }

  /**
   * Obtener roles para filtros (formato {id, name})
   */
  async getFilter() {
    const roles = await this.roleRepository
      .createQueryBuilder('role')
      .select(['role.id as id', 'role.Nombre as name'])
      .orderBy('role.Nombre', 'ASC')
      .getRawMany();

    return roles;
  }
}
