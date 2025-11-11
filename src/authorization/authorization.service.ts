import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './repositories/role.repository';
import { PermissionRepository } from './repositories/permission.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { In } from 'typeorm';

@Injectable()
export class AuthorizationService {
  private readonly logger = new Logger(AuthorizationService.name);

  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
    @InjectRepository(PermissionRepository)
    private readonly permissionRepository: PermissionRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  // ==================== ROLES ====================

  /**
   * Obtener todos los roles con sus permisos
   */
  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.findAllWithPermissions();
  }

  /**
   * Obtener un rol por ID
   */
  async getRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findByIdWithPermissions(id);
    if (!role) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }
    return role;
  }

  /**
   * Obtener roles de un usuario
   */
  async getUserRoles(userId: number): Promise<Role[]> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return user.roles || [];
  }

  /**
   * Asignar roles a un usuario
   */
  async assignRolesToUser(userId: number, roleIds: number[]): Promise<void> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const roles = await this.roleRepository.find({
      where: { id: In(roleIds) }
    });

    if (roles.length !== roleIds.length) {
      throw new HttpException('Uno o más roles no encontrados', HttpStatus.BAD_REQUEST);
    }

    user.roles = roles;
    await this.userRepository.save(user);
    
    this.logger.log(`Roles asignados al usuario ${userId}: ${roleIds.join(', ')}`);
  }

  /**
   * Remover un rol de un usuario
   */
  async removeRoleFromUser(userId: number, roleId: number): Promise<void> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    user.roles = user.roles.filter(role => role.id !== roleId);
    await this.userRepository.save(user);
    
    this.logger.log(`Rol ${roleId} removido del usuario ${userId}`);
  }

  // ==================== PERMISOS ====================

  /**
   * Obtener todos los permisos
   */
  async getAllPermissions(): Promise<any[]> {
    const permissions = await this.permissionRepository.findAllPermissions();
    // Mapear los nombres de las propiedades para el frontend
    return permissions.map(permission => ({
      id: permission.id,
      name: permission.nombre,
      description: permission.descripcion
    }));
  }

  /**
   * Obtener un permiso por ID
   */
  async getPermissionById(id: number): Promise<Permission> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      throw new HttpException('Permiso no encontrado', HttpStatus.NOT_FOUND);
    }
    return permission;
  }

  /**
   * Obtener todos los permisos de un usuario (directos + de roles)
   */
  async getUserPermissions(userId: number): Promise<string[]> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const allPermissions = new Set<string>();
    
    // Permisos directos
    if (user.permissions) {
      user.permissions.forEach(p => allPermissions.add(p.nombre));
    }

    // Permisos de roles
    if (user.roles) {
      user.roles.forEach(role => {
        if (role.permissions) {
          role.permissions.forEach(p => allPermissions.add(p.nombre));
        }
      });
    }

    return Array.from(allPermissions);
  }

  /**
   * Asignar permisos directos a un usuario
   */
  async assignPermissionsToUser(userId: number, permissionIds: number[]): Promise<void> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const permissions = await this.permissionRepository.find({
      where: { id: In(permissionIds) }
    });

    if (permissions.length !== permissionIds.length) {
      throw new HttpException('Uno o más permisos no encontrados', HttpStatus.BAD_REQUEST);
    }

    user.permissions = permissions;
    await this.userRepository.save(user);
    
    this.logger.log(`Permisos asignados al usuario ${userId}: ${permissionIds.join(', ')}`);
  }

  /**
   * Remover un permiso directo de un usuario
   */
  async removePermissionFromUser(userId: number, permissionId: number): Promise<void> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    user.permissions = user.permissions.filter(permission => permission.id !== permissionId);
    await this.userRepository.save(user);
    
    this.logger.log(`Permiso ${permissionId} removido del usuario ${userId}`);
  }

  /**
   * Asignar permisos a un rol
   */
  async assignPermissionsToRole(roleId: number, permissionIds: number[]): Promise<void> {
    const role = await this.roleRepository.findByIdWithPermissions(roleId);
    if (!role) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }

    const permissions = await this.permissionRepository.find({
      where: { id: In(permissionIds) }
    });

    if (permissions.length !== permissionIds.length) {
      throw new HttpException('Uno o más permisos no encontrados', HttpStatus.BAD_REQUEST);
    }

    role.permissions = permissions;
    await this.roleRepository.save(role);
    
    this.logger.log(`Permisos asignados al rol ${roleId}: ${permissionIds.join(', ')}`);
  }

  /**
   * Verificar si un usuario tiene un permiso específico
   */
  async userHasPermission(userId: number, permissionName: string): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId);
    return permissions.includes(permissionName);
  }

  /**
   * Verificar si un usuario tiene un rol específico
   */
  async userHasRole(userId: number, roleName: string): Promise<boolean> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      return false;
    }
    return user.roles?.some(role => role.nombre === roleName) || false;
  }
}
