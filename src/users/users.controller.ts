import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiBody({ type: LoginDto, description: 'Datos necesarios para iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso, devuelve el token JWT' })
  @ApiResponse({ status: 400, description: 'Credenciales incorrectas' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  async login(@Body() loginDto: LoginDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      const { email, password } = loginDto;

      return this.usersService.login(email, password);
    } catch (error) {
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
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto, description: 'Datos del usuario a crear' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de usuario inválidos' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  create(@Body() createUserDto: CreateUserDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  findOne(@Param('id', ParseIntPipe) id: number) {

    try {
      // Llamar al servicio y pasar los datos validados
      return this.usersService.findOneById(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
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
  updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const email = req.user.email; // Se obtiene del token JWT
    const { user, cargo, img, oldpass, newpass } = updateUserDto;

    try {
      if (user || cargo) {
        this.usersService.updateUserInfo(email, user, cargo);
      }

      if (img) {
        this.usersService.updateImage(email, img);
      }

      if (oldpass && newpass) {
        this.usersService.changePassword(email, oldpass, newpass);
      }

      if (!user && !cargo && !img && (!oldpass || !newpass)) {
        throw new HttpException(
          'Ha ocurrido un error durante la petición.',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { status: 'Success', message: 'User updated successfully' };
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar usuario por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contraseña de usuario' })
  @ApiBody({ type: ResetPasswordDto, description: 'Correo del usuario para restablecer la contraseña' })
  @ApiResponse({ status: 200, description: 'Contraseña restablecida exitosamente' })
  @ApiResponse({ status: 400, description: 'Correo inválido' })
  @ApiResponse({ status: 500, description: 'Error en el servidor' })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.usersService.resetPassword(resetPasswordDto.email);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
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
  checkCode(@Body('code') code: string) {
    try {
      // Validar que el código no sea undefined y no contenga caracteres peligrosos
      if (!code || /['";\\%_]/.test(code)) {
        throw new HttpException(
          'El código proporcionado no es válido.',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Llamar al servicio para verificar el código
      const email = this.usersService.checkCode(code);

      if (!email) {
        throw new HttpException(
          'El código no es válido o ha expirado.',
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'Success', email };
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
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
  newPassword(@Body() newPasswordDto: NewPasswordDto) {
    try {
      const { email, newpass } = newPasswordDto;
      return this.usersService.newPassword(email, newpass);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
