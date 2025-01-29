import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  checkCode(code: string): string {
    throw new Error('Method not implemented.');
  }
  resetPassword(email: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private readonly jwtService: JwtService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneById(userId: number): Promise<User> {
    // Lógica para obtener el usuario desde la base de datos
    return
  }

  async login(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new Error('Email o contraseña incorrectos.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Email o contraseña incorrectos.');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findOneByEmail(email: string): Promise<User> {
    // Lógica para obtener el usuario desde la base de datos
    return
  }

  updateUserInfo(email: string, user?: string, cargo?: string) {
    if (!user && !cargo) {
      throw new HttpException('At least one field (user or cargo) is required.', HttpStatus.BAD_REQUEST);
    }

    

    return { status: 'Success', message: 'User information updated successfully' };
  }

  updateImage(email: string, img: string) {
    if (!img) {
      throw new HttpException('Image is required.', HttpStatus.BAD_REQUEST);
    }


    return { status: 'Success', message: 'User image updated successfully' };
  }

  changePassword(email: string, oldpass: string, newpass: string) {
    //Buscar usuario

    const [user] = [{password:''}]
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    const passValid =  bcrypt.compare(oldpass, user.password);
    if (!passValid) {
      throw new HttpException('Current password is incorrect.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword =  bcrypt.hash(newpass, 10);
    //Update password

    return { status: 'Success', message: 'Password updated successfully' };
  }
}
