import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      const { email, password } = loginDto;

      return this.usersService.login(email, password);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Post()
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
  findOne(@Param('id', ParseIntPipe) id: number) {

    try {
      // Llamar al servicio y pasar los datos validados
      return this.usersService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
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
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }


  @Post('reset-password')
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
