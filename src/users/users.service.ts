import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
import { DataSource } from 'typeorm';

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
    private readonly utilitiesService: UtilitiesService,
    private readonly dataSource: DataSource,
    @Inject('LOGGER') private readonly logger) {

  }

  async newPassword(email: string, newpass: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      this.logger.warn(`Usuario con email(${email}) no encontrado`)
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    const hashedPassword = await bcrypt.hash(newpass, 10);
    user.password = hashedPassword;

    return await this.dataSource.transaction(async (manager) => {
      try {
        await this.userRepository.save(user);
        // Eliminar los cambios de contraseña anteriores 
        const result = await this.passwordChangesRepository.removeByEmail(user.email);

        return { status: 'Success', data: result };
      } catch (error) {
        this.logger.error(`Ha ocurrido un error al cambiar la contraseña: ${error}`)
        throw new HttpException('Error al cambiar la contraseña.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });



  }

  async checkCode(code: string): Promise<string> {
    return await this.passwordChangesRepository.findByCode(code)

  }
  async resetPassword(email: string) {
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (!existingUser) {
      this.logger.warn(`El usario con email (${email}) no existe`)
      throw new HttpException('El usuario no existe', HttpStatus.BAD_REQUEST);
    }
    const code = this.utilitiesService.generateCode(15);

    const domain = await this.configRepository.getDomain();

    await this.mailService.sendResetPasswordMail(
      existingUser,
      `${domain}/reset-password/${code}`
    );

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
      this.logger.warn(`El usario con email (${email}) ya existe`)
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
      this.logger.warn(`No se ha encontrada el usario con id: ${id}`)
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    return this.userRepository.removeById(id);
  }

  async findOneById(userId: number): Promise<User> {
    console.log();
    this.logger.debug(`Buscando usuario por id: ${userId}`)
    return await this.userRepository.findUserById(userId);
  }

  async login(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    console.log(user)
    this.logger.debug(user)
    if (!user) {
      this.logger.warn(`No se ha encontrado usario con email:${email}`)
      throw new HttpException(
        'Email o contraseña incorrectos.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      this.logger.warn(`No coinciden las contraseñas: ${password} , ${user.password}`)
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
      id: user.id
    };
  }


  async findOneByEmail(email: string): Promise<User> {
    console.log();
    this.logger.debug(`Buscando usuario por email: ${email}`)
    return await this.userRepository.findUserByEmail(email);
  }

  async updateUserInfo(email: string, username?: string, cargo?: string) {

    if (!username && !cargo) {
      this.logger.warn(`Campos username o cargo es obligatorio`)
      throw new HttpException('Usuario o cargo es obligatorio', HttpStatus.BAD_REQUEST);
    }
    const user = await this.findOneByEmail(email);
    if (!user) {
      this.logger.warn(`Usaurio con email (${email}) no encontrado`)
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
      this.logger.warn('La imagen es obligatoria')
      throw new HttpException('Iamgen es obligatoria.', HttpStatus.BAD_REQUEST);
    }
    const user = await this.findOneByEmail(email);
    if (!user) {
      this.logger.warn(`Usuario con email (${email}) no encontrado`)
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    user.image = img
    const result = this.userRepository.save(user)
    return { status: 'Success', data: result };

  }

  async changePassword(email: string, oldpass: string, newpass: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      this.logger.warn(`Usuario con email (${email}) no encontrado`)
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    const passValid = await bcrypt.compare(oldpass, user.password);
    if (!passValid) {
      this.logger.warn(`La cooontraseña es incorrecta, no coincide: ${oldpass}, ${user.password}`)
      throw new HttpException('Contraseña actual incorrecta.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(newpass, 10);

    user.password = hashedPassword;
    const result = this.userRepository.save(user)
    return { status: 'Success', data: result };
  }
}
