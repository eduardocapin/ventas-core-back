import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

/**
 * Decorador para especificar qué permisos se requieren para acceder a una ruta
 * @param permissions - Array de nombres de permisos requeridos
 * 
 * @Permissions('CONFIGURACION_BORRADO_COMPETIDORES', 'CONFIGURACION_EDICION_COMPETIDORES')
 * @Delete(':id')
 * remove(@Param('id') id: string) { ... }
 */
export const Permissions = (...permissions: string[]) => 
  SetMetadata(PERMISSIONS_KEY, permissions);
