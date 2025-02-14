import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/shared/mail/mail.service';
import { UtilitiesService } from 'src/shared/utilities/utilities.service';
import { ConfigRepository } from 'src/repositories/config/config.repository';
import { PasswordChangesRepository } from 'src/repositories/password-changes/password-changes.repository';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(ConfigRepository)
    private readonly configRepository: ConfigRepository,
    @InjectRepository(PasswordChangesRepository)
    private readonly passwordChangesRepository: PasswordChangesRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly utilitiesService: UtilitiesService) {

  }

  async newPassword(email: string, newpass: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    const hashedPassword = await bcrypt.hash(newpass, 10);
    user.password = hashedPassword;
    const queryRunner = this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      await this.userRepository.save(user); 
      // Eliminar los cambios de contraseña anteriores 
      const result = await this.passwordChangesRepository.removeByEmail(user.email);  

      // Hacer commit de la transacción
      await queryRunner.commitTransaction();

      return { status: 'Success', data: result };
    } catch (error) {
      //hacer rollback de la transacción
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async checkCode(code: string): Promise<string> {
    return await this.passwordChangesRepository.findByCode(code)

  }
  async resetPassword(email: string) {
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (!existingUser) {
      throw new HttpException('El usuario no existe', HttpStatus.BAD_REQUEST);
    }
    const code = this.utilitiesService.generateCode(15);

    const domain = await this.configRepository.getDomain();

    await this.mailService.sendResetPasswordMail(
      existingUser,
      `https://www.${domain}/reset-password/${code}`
    );

    //TODO: Insertar en passwordChanges
    const passwordChange = this.passwordChangesRepository.create({
      user_id: existingUser.id,
      email,
      code,
      date: new Date(),
      active: true,
    });
    const result = this.passwordChangesRepository.save(passwordChange)
    return { status: "Success", data: result }
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.removeById(id);
  }

  async findOneById(userId: number): Promise<User> {
    console.log(`Buscando usuario por id: ${userId}`);
    return await this.userRepository.findUserById(userId);
  }

  async login(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    console.log(user)
    if (!user) {
      throw new HttpException(
        'Email o contraseña incorrectos.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Email o contraseña incorrectos.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { email: user.email, sub: user.id };
    return {
      msg: "Login exitoso",
      token: this.jwtService.sign(payload),
      name: user.name,
      cargo: user.position_company,
    };
  }


  async findOneByEmail(email: string): Promise<User> {
    console.log(`Buscando usuario por email: ${email}`);
    return await this.userRepository.findUserByEmail(email);
  }

  async updateUserInfo(email: string, username?: string, cargo?: string) {

    if (!username && !cargo) {
      throw new HttpException('Usuario o cargo es obligatorio', HttpStatus.BAD_REQUEST);
    }
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    if (username) {
      user.name = username;
    }
    if (cargo) {
      user.position_company = cargo;
    }
    const result = this.userRepository.save(user)
    return { status: 'Success', data: result };

  }

  async updateImage(email: string, img: string) {
    if (!img) {
      throw new HttpException('Iamgen es obligatoria.', HttpStatus.BAD_REQUEST);
    }
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    user.image = img
    const result = this.userRepository.save(user)
    return { status: 'Success', data: result };

  }

  async changePassword(email: string, oldpass: string, newpass: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    const passValid = await bcrypt.compare(oldpass, user.password);
    if (!passValid) {
      throw new HttpException('Contraseña actual incorrecta.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(newpass, 10);

    user.password = hashedPassword;
    const result = this.userRepository.save(user)
    return { status: 'Success', data: result };
  }
}
