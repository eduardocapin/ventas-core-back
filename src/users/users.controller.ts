import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe, Req, Inject, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '../authorization/guards/permissions.guard';
import { Permissions } from '../authorization/decorators/permissions.decorator';
import { Roles } from '../authorization/decorators/roles.decorator';
import { RolesGuard } from '../authorization/guards/roles.guard';
import e from 'express';

@ApiTags('Usarios')
@Controller('users')
export class UsersController {

  private readonly logger = new Logger(UsersController.name);
  
  constructor(private readonly usersService: UsersService) { }


  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiBody({ type: LoginDto, description: 'Datos necesarios para iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso, devuelve el token JWT' })
  @ApiResponse({ status: 400, description: 'Credenciales incorrectas' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  async login(@Body() loginDto: LoginDto) {
    try {
      this.logger.log(`Se ha solicitado el login para: ${loginDto}`)
      // Llamar al servicio y pasar los datos validados
      const { email, password } = loginDto;

      return this.usersService.login(email, password);
    } catch (error) {
      this.logger.error(`Ha ocurrido un error durante el login para ${loginDto}: ${error}`)
      console.log(error);
      if (error instanceof HttpException) {
        throw error; // Re-lanzamos el error HTTP específico si ya fue manejado.
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('Admin')
  @Permissions('VISUALIZADO_USUARIOS')
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los usuarios con roles y permisos (Admin o con permiso VISUALIZADO_USUARIOS)' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios con roles y permisos' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  async findAll() {
    try {
      this.logger.log('Se ha solicitado la lista de todos los usuarios');
      return await this.usersService.findAll();
    } catch (error) {
      this.logger.error(`Error al obtener usuarios: ${error}`);
      throw new HttpException(
        { message: 'Error al obtener usuarios', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo usuario (Solo Admin)' })
  @ApiBody({ type: CreateUserDto, description: 'Datos del usuario a crear' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de usuario inválidos' })
  @ApiResponse({ status: 403, description: 'Acceso denegado: Solo Admin' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      this.logger.log('Se ha solicitado la creacion de un usuario')
      // Llamar al servicio y pasar los datos validados
      return await this.usersService.create(createUserDto);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la creacion del usuario(${createUserDto}): ${error}`)
      if (error instanceof HttpException) {
        throw error; // Re-lanzamos el error HTTP específico si ya fue manejado.
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuario por ID (Solo Admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado: Solo Admin' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  async findOne(@Param('id', ParseIntPipe) id: number) {

    try {
      this.logger.log(`Se ha solicitado el usario con id: ${id}`)
      // Llamar al servicio y pasar los datos validados
      return await this.usersService.findOneById(+id);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la obtencion del usuario(${id}): ${error}`)
      if (error instanceof HttpException) {
        throw error; // Re-lanzamos el error HTTP específico si ya fue manejado.
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar la información del usuario' })
  @ApiBody({ type: UpdateUserDto, description: 'Datos a actualizar del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos incorrectos' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  async updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const email = req.user.email; // Se obtiene del token JWT
    const { user, cargo, img, oldpass, newpass } = updateUserDto;
    this.logger.log(`Se ha solicitado la actualizacion del usario: ${email}`)
    try {
      if (user || cargo) {
        await this.usersService.updateUserInfo(email, user, cargo);
      }

      if (img) {
        await this.usersService.updateImage(email, img);
      }

      if (oldpass && newpass) {
        await this.usersService.changePassword(email, oldpass, newpass);
      }

      if (!user && !cargo && !img && (!oldpass || !newpass)) {
        this.logger.warn(`Faltan campos para actualizar el usario: ${updateUserDto}`)
        throw new HttpException(
          'Ha ocurrido un error durante la petición.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { status: 'Success', message: 'User updated successfully' };
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la actualizacion del usario(${email}): ${error}`)
      if (error instanceof HttpException) {
        console.log(error)
        throw error; // Re-lanzamos el error HTTP específico si ya fue manejado.
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar usuario por ID (Solo Admin)' })
  @ApiParam({ name: 'id', type: String, description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado: Solo Admin' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  async remove(@Param('id') id: string) {
    this.logger.log(`Se ha solicitado la eliminación del usario con id: ${id}`)
    try {
      // Llamar al servicio y pasar los datos validados
      return await this.usersService.remove(+id);
    } catch (error) {
      this.logger.error(`Ha ocurrido un error durante la eliminación del usario(${id}): ${error} `)
      console.log(error);
      if (error instanceof HttpException) {
        throw error; // Re-lanzamos el error HTTP específico si ya fue manejado.
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contraseña de usuario' })
  @ApiBody({ type: ResetPasswordDto, description: 'Correo del usuario para restablecer la contraseña' })
  @ApiResponse({ status: 200, description: 'Contraseña restablecida exitosamente' })
  @ApiResponse({ status: 400, description: 'Correo inválido' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      this.logger.log(`Se ha soliciado el reseto de contraseña para el usario: ${resetPasswordDto}`)
      // Llamar al servicio y pasar los datos validados
      return await this.usersService.resetPassword(resetPasswordDto.email);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la solicitud de reseto de contraseña para el usuario(${resetPasswordDto}): ${error}`)
      if (error instanceof HttpException) {
        throw error; // Re-lanzamos el error HTTP específico si ya fue manejado.
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('check-code')
  @ApiOperation({ summary: 'Verificar código de restablecimiento de contraseña' })
  @ApiBody({ type: String, description: 'Código de verificación de restablecimiento' })
  @ApiResponse({ status: 200, description: 'Código válido, devuelve el correo asociado' })
  @ApiResponse({ status: 400, description: 'Código inválido' })
  @ApiResponse({ status: 404, description: 'Código no encontrado o expirado' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  async checkCode(@Body('code') code: string) {
    try {
      this.logger.log('Se ha solicitado la comprobacion de codigo de cambio de contraseña')
      // Validar que el código no sea undefined y no contenga caracteres peligrosos
      if (!code || /['";\\%_]/.test(code)) {
        this.logger.warn(`El codigo (${code}) tiene un formato invalido`)
        throw new HttpException(
          'El código proporcionado no es válido.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Llamar al servicio para verificar el código
      const email = await this.usersService.checkCode(code);

      if (!email) {
        throw new HttpException(
          'El código no es válido o ha expirado.',
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'Success', email };
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la comprobacion del codigo de cambio de contraseña(${code}): ${error}`)
      if (error instanceof HttpException) {
        throw error; // Re-lanzamos el error HTTP específico si ya fue manejado.
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('new-password')
  @ApiOperation({ summary: 'Establecer una nueva contraseña' })
  @ApiBody({ type: NewPasswordDto, description: 'Correo y nueva contraseña' })
  @ApiResponse({ status: 200, description: 'Contraseña actualizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos incorrectos' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  async newPassword(@Body() newPasswordDto: NewPasswordDto) {
    try {
      const { email, newpass } = newPasswordDto;
      this.logger.log(`Se establece una nueva contraseña para el usario: ${email}`)
      return await this.usersService.newPassword(email, newpass);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al establecer la nueva contraseña al usario(${newPasswordDto}): ${error}`)
      if (error instanceof HttpException) {
        throw error; // Re-lanzamos el error HTTP específico si ya fue manejado.
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Endpoints para gestión de roles
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ASIGNACION_ROLES_USUARIOS')
  @Post('assign-role')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Asignar rol a usuario (requiere permiso ASIGNACION_ROLES_USUARIOS)' })
  @ApiResponse({ status: 200, description: 'Rol asignado correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async assignRole(@Body() body: { userId: number; roleId: number }) {
    try {
      this.logger.log(`Asignando rol ${body.roleId} al usuario ${body.userId}`);
      return await this.usersService.assignRole(body.userId, body.roleId);
    } catch (error) {
      this.logger.error(`Error al asignar rol: ${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error al asignar rol', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ASIGNACION_ROLES_USUARIOS')
  @Post('remove-role')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Quitar rol a usuario (requiere permiso ASIGNACION_ROLES_USUARIOS)' })
  @ApiResponse({ status: 200, description: 'Rol removido correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async removeRole(@Body() body: { userId: number; roleId: number }) {
    try {
      this.logger.log(`Removiendo rol ${body.roleId} del usuario ${body.userId}`);
      return await this.usersService.removeRole(body.userId, body.roleId);
    } catch (error) {
      this.logger.error(`Error al remover rol: ${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error al remover rol', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Endpoints para gestión de permisos
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ASIGNACION_PERMISOS_USUARIOS')
  @Post('assign-permission')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Asignar permiso a usuario (requiere permiso ASIGNACION_PERMISOS_USUARIOS)' })
  @ApiResponse({ status: 200, description: 'Permiso asignado correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async assignPermission(@Body() body: { userId: number; permissionId: number }) {
    try {
      this.logger.log(`Asignando permiso ${body.permissionId} al usuario ${body.userId}`);
      return await this.usersService.assignPermission(body.userId, body.permissionId);
    } catch (error) {
      this.logger.error(`Error al asignar permiso: ${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error al asignar permiso', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ASIGNACION_PERMISOS_USUARIOS')
  @Post('remove-permission')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Quitar permiso a usuario (requiere permiso ASIGNACION_PERMISOS_USUARIOS)' })
  @ApiResponse({ status: 200, description: 'Permiso removido correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async removePermission(@Body() body: { userId: number; permissionId: number }) {
    try {
      this.logger.log(`Removiendo permiso ${body.permissionId} del usuario ${body.userId}`);
      return await this.usersService.removePermission(body.userId, body.permissionId);
    } catch (error) {
      this.logger.error(`Error al remover permiso: ${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error al remover permiso', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar usuario (borrado lógico - Solo Admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado: Solo Admin' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      this.logger.log(`Eliminando usuario con ID: ${id}`);
      return await this.usersService.deleteUser(id);
    } catch (error) {
      this.logger.error(`Error al eliminar usuario: ${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error al eliminar usuario', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
