import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe, Req, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { LoginDto } from './dto/login.dto';
import { PaginatedUsersDto } from './dto/paginated-users.dto';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '../authorization/guards/permissions.guard';
import { Permissions } from '../authorization/decorators/permissions.decorator';
import { Roles } from '../authorization/decorators/roles.decorator';
import { RolesGuard } from '../authorization/guards/roles.guard';

@ApiTags('Usarios')
@Controller('users')
export class UsersController {

  private readonly logger = new Logger(UsersController.name);
  
  constructor(private readonly usersService: UsersService) { }


  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 400, description: 'Credenciales incorrectas' })
  async login(@Body() loginDto: LoginDto, @Req() req) {
    try {
      this.logger.log(`Login solicitado para: ${loginDto.email}`);
      
      const deviceInfo = {
        ip: req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
        userAgent: req.headers['user-agent'],
        browser: this.extractBrowser(req.headers['user-agent']),
        os: this.extractOS(req.headers['user-agent']),
      };

      return this.usersService.login(loginDto.email, loginDto.password, deviceInfo);
    } catch (error) {
      this.logger.error(`Error en login para ${loginDto.email}: ${error}`);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error en el servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private extractBrowser(userAgent: string = ''): string {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private extractOS(userAgent: string = ''): string {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'MacOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('Admin')
  @Permissions('VISUALIZADO_USUARIOS')
  @Post('list')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuarios paginados con roles y permisos' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  async findAll(@Body() paginatedUsersDto: PaginatedUsersDto) {
    return this.usersService.findAllPaginated(paginatedUsersDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('Admin')
  @Permissions('VISUALIZADO_USUARIOS')
  @Get('active-count')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener conteo de usuarios activos' })
  @ApiResponse({ status: 200, description: 'Conteo de usuarios' })
  async getActiveUsersCount() {
    const count = await this.usersService.getActiveUsersCount();
    return { count };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión actual' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada' })
  async logout(@Req() req) {
    const token = req.headers.authorization?.substring(7);
    if (token) await this.usersService.logout(token);
    return { message: 'Sesión cerrada correctamente' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario actual con empresas asignadas' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario' })
  async getCurrentProfile(@Req() req) {
    const userId = req.user.userId;
    return this.usersService.getCurrentUserProfile(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear usuario (Solo Admin)' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar usuario por ID (Admin)' })
  @ApiBody({ type: AdminUpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  async adminUpdateUser(@Param('id', ParseIntPipe) id: number, @Body() adminUpdateUserDto: AdminUpdateUserDto) {
    return this.usersService.adminUpdate(id, adminUpdateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar información del usuario actual' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  async updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const email = req.user.email;
    const { user, cargo, img, oldpass, newpass } = updateUserDto;

    if (user || cargo) await this.usersService.updateUserInfo(email, user, cargo);
    if (img) await this.usersService.updateImage(email, img);
    if (oldpass && newpass) await this.usersService.changePassword(email, oldpass, newpass);

    if (!user && !cargo && !img && (!oldpass || !newpass)) {
      throw new HttpException('No hay campos para actualizar', HttpStatus.BAD_REQUEST);
    }

    return { status: 'Success', message: 'Usuario actualizado' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar usuario (Solo Admin)' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contraseña' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Email de restablecimiento enviado' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPassword(resetPasswordDto.email);
  }

  @Post('check-code')
  @ApiOperation({ summary: 'Verificar código de restablecimiento' })
  @ApiResponse({ status: 200, description: 'Código válido' })
  async checkCode(@Body('code') code: string) {
    if (!code || /['";\\%_]/.test(code)) {
      throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    }

    const email = await this.usersService.checkCode(code);
    if (!email) {
      throw new HttpException('Código no válido o expirado', HttpStatus.NOT_FOUND);
    }

    return { status: 'Success', email };
  }

  @Post('new-password')
  @ApiOperation({ summary: 'Establecer nueva contraseña' })
  @ApiBody({ type: NewPasswordDto })
  @ApiResponse({ status: 200, description: 'Contraseña actualizada' })
  async newPassword(@Body() newPasswordDto: NewPasswordDto) {
    return this.usersService.newPassword(newPasswordDto.email, newPasswordDto.newpass);
  }

  // Gestión de roles
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ASIGNACION_ROLES_USUARIOS')
  @Post('assign-role')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Asignar rol a usuario' })
  async assignRole(@Body() body: { userId: number; roleId: number }) {
    return this.usersService.assignRole(body.userId, body.roleId);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ASIGNACION_ROLES_USUARIOS')
  @Post('remove-role')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Quitar rol a usuario' })
  async removeRole(@Body() body: { userId: number; roleId: number }) {
    return this.usersService.removeRole(body.userId, body.roleId);
  }

  // Gestión de permisos
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ASIGNACION_PERMISOS_USUARIOS')
  @Post('assign-permission')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Asignar permiso a usuario' })
  async assignPermission(@Body() body: { userId: number; permissionId: number }) {
    return this.usersService.assignPermission(body.userId, body.permissionId);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ASIGNACION_PERMISOS_USUARIOS')
  @Post('remove-permission')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Quitar permiso a usuario' })
  async removePermission(@Body() body: { userId: number; permissionId: number }) {
    return this.usersService.removePermission(body.userId, body.permissionId);
  }

  // Gestión de empresas
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ASIGNACION_ROLES_USUARIOS')
  @Post('assign-empresa')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Asignar empresa a usuario' })
  async assignEmpresa(@Body() body: { userId: number; empresaId: number }) {
    return this.usersService.assignEmpresa(body.userId, body.empresaId);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ASIGNACION_ROLES_USUARIOS')
  @Post('remove-empresa')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Quitar empresa a usuario' })
  async removeEmpresa(@Body() body: { userId: number; empresaId: number }) {
    return this.usersService.removeEmpresa(body.userId, body.empresaId);
  }
}
