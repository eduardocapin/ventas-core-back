import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorador para especificar qué roles pueden acceder a una ruta
 * @param roles - Array de nombres de roles permitidos
 * 
 * @example
 * @Roles('Admin', 'Editor')
 * @Get()
 * findAll() { ... }
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
