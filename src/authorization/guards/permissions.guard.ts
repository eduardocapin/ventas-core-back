import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

/**
 * Guard para proteger rutas basándose en permisos
 * Verifica si el usuario tiene al menos uno de los permisos requeridos
 * Los permisos pueden venir de:
 * - Permisos directos asignados al usuario (UsuariosPermisos)
 * - Permisos heredados de sus roles (RolesPermisos)
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Si no hay permisos requeridos, permitir acceso
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      this.logger.warn('Usuario no autenticado intentando acceder a ruta protegida');
      return false;
    }

    // Verificar si el usuario tiene al menos uno de los permisos requeridos
    const hasPermission = requiredPermissions.some((permission) =>
      user.permissions?.some((userPermission: string) => userPermission === permission)
    );

    if (!hasPermission) {
      this.logger.warn(
        `Usuario ${user.email} no tiene los permisos requeridos: ${requiredPermissions.join(', ')}`
      );
    }

    return hasPermission;
  }
}
