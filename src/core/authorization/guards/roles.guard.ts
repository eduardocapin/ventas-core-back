import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

/**
 * Guard para proteger rutas basándose en roles
 * Verifica si el usuario tiene al menos uno de los roles requeridos
 */
@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no hay roles requeridos, permitir acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      this.logger.warn('Usuario no autenticado intentando acceder a ruta protegida');
      return false;
    }

    // Verificar si el usuario tiene al menos uno de los roles requeridos
    const hasRole = requiredRoles.some((role) =>
      user.roles?.some((userRole: string) => userRole === role)
    );

    if (!hasRole) {
      this.logger.warn(
        `Usuario ${user.email} no tiene los roles requeridos: ${requiredRoles.join(', ')}`
      );
    }

    return hasRole;
  }
}
