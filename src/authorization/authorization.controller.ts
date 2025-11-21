import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  UseGuards, 
  ParseIntPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { Permissions } from './decorators/permissions.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Autorización')
@ApiBearerAuth()
@Controller('authorization')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  // ==================== ROLES ====================

  @Get('roles')
  @Permissions('VISUALIZADO_CONFIGURACION')
  @ApiOperation({ summary: 'Obtener todos los roles con sus permisos' })
  @ApiResponse({ status: 200, description: 'Lista de roles obtenida exitosamente' })
  async getAllRoles() {
    return this.authorizationService.getAllRoles();
  }

  @Get('roles/:id')
  @Permissions('VISUALIZADO_CONFIGURACION')
  @ApiOperation({ summary: 'Obtener un rol por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rol' })
  @ApiResponse({ status: 200, description: 'Rol encontrado' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async getRoleById(@Param('id', ParseIntPipe) id: number) {
    return this.authorizationService.getRoleById(id);
  }

  @Get('users/:userId/roles')
  @Permissions('VISUALIZADO_USUARIOS')
  @ApiOperation({ summary: 'Obtener roles de un usuario' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Roles del usuario obtenidos exitosamente' })
  async getUserRoles(@Param('userId', ParseIntPipe) userId: number) {
    return this.authorizationService.getUserRoles(userId);
  }

  @Post('users/:userId/roles')
  @Permissions('ASIGNACION_ROLES_USUARIOS')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Asignar roles a un usuario' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiBody({ type: AssignRolesDto })
  @ApiResponse({ status: 200, description: 'Roles asignados exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async assignRolesToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() assignRolesDto: AssignRolesDto,
  ) {
    await this.authorizationService.assignRolesToUser(userId, assignRolesDto.roleIds);
    return { message: 'Roles asignados exitosamente' };
  }

  @Delete('users/:userId/roles/:roleId')
  @Permissions('ASIGNACION_ROLES_USUARIOS')
  @ApiOperation({ summary: 'Remover un rol de un usuario' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiParam({ name: 'roleId', type: Number, description: 'ID del rol' })
  @ApiResponse({ status: 200, description: 'Rol removido exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async removeRoleFromUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    await this.authorizationService.removeRoleFromUser(userId, roleId);
    return { message: 'Rol removido exitosamente' };
  }

  // ==================== PERMISOS ====================

  @Get('permissions')
  @Permissions('VISUALIZADO_CONFIGURACION')
  @ApiOperation({ summary: 'Obtener todos los permisos' })
  @ApiResponse({ status: 200, description: 'Lista de permisos obtenida exitosamente' })
  async getAllPermissions() {
    return this.authorizationService.getAllPermissions();
  }

  @Get('permissions/:id')
  @Permissions('VISUALIZADO_CONFIGURACION')
  @ApiOperation({ summary: 'Obtener un permiso por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del permiso' })
  @ApiResponse({ status: 200, description: 'Permiso encontrado' })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
  async getPermissionById(@Param('id', ParseIntPipe) id: number) {
    return this.authorizationService.getPermissionById(id);
  }

  @Get('users/:userId/permissions')
  @Permissions('VISUALIZADO_USUARIOS')
  @ApiOperation({ summary: 'Obtener todos los permisos de un usuario (directos + de roles)' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Permisos del usuario obtenidos exitosamente' })
  async getUserPermissions(@Param('userId', ParseIntPipe) userId: number) {
    return this.authorizationService.getUserPermissions(userId);
  }

  @Post('users/:userId/permissions')
  @Permissions('ASIGNACION_PERMISOS_USUARIOS')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Asignar permisos directos a un usuario' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiBody({ type: AssignPermissionsDto })
  @ApiResponse({ status: 200, description: 'Permisos asignados exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async assignPermissionsToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() assignPermissionsDto: AssignPermissionsDto,
  ) {
    await this.authorizationService.assignPermissionsToUser(
      userId,
      assignPermissionsDto.permissionIds,
    );
    return { message: 'Permisos asignados exitosamente' };
  }

  @Delete('users/:userId/permissions/:permissionId')
  @Permissions('ASIGNACION_PERMISOS_USUARIOS')
  @ApiOperation({ summary: 'Remover un permiso directo de un usuario' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID del usuario' })
  @ApiParam({ name: 'permissionId', type: Number, description: 'ID del permiso' })
  @ApiResponse({ status: 200, description: 'Permiso removido exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async removePermissionFromUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('permissionId', ParseIntPipe) permissionId: number,
  ) {
    await this.authorizationService.removePermissionFromUser(userId, permissionId);
    return { message: 'Permiso removido exitosamente' };
  }

  @Post('roles/:roleId/permissions')
  @Permissions('ASIGNACION_PERMISOS_USUARIOS')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Asignar permisos a un rol' })
  @ApiParam({ name: 'roleId', type: Number, description: 'ID del rol' })
  @ApiBody({ type: AssignPermissionsDto })
  @ApiResponse({ status: 200, description: 'Permisos asignados exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado' })
  async assignPermissionsToRole(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() assignPermissionsDto: AssignPermissionsDto,
  ) {
    await this.authorizationService.assignPermissionsToRole(
      roleId,
      assignPermissionsDto.permissionIds,
    );
    return { message: 'Permisos asignados al rol exitosamente' };
  }

  // ==================== VERIFICACIONES ====================

  @Get('me')
  @ApiOperation({ summary: 'Obtener información de autorización del usuario actual' })
  @ApiResponse({ status: 200, description: 'Información de autorización obtenida' })
  async getCurrentUserAuth(@CurrentUser() user: any) {
    return {
      userId: user.userId,
      email: user.email,
      roles: user.roles || [],
      permissions: user.permissions || []
    };
  }
}
