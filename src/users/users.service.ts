import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginatedUsersDto } from './dto/paginated-users.dto';
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

  private readonly logger = new Logger(UsersService.name);

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
    private readonly dataSource: DataSource) {

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

  async findAll() {
    try {
      const users = await this.userRepository.find({
        relations: ['roles', 'roles.permissions', 'permissions'],
      });
      
      // Mapear usuarios para incluir información clara de roles y permisos
      return users.map(user => {
        // Obtener permisos directos del usuario
        const directPermissions = user.permissions.map(permission => ({
          id: permission.id,
          name: permission.nombre,
          description: permission.descripcion
        }));

        // Obtener permisos que vienen de los roles
        const rolePermissionsMap = new Map();
        user.roles.forEach(role => {
          if (role.permissions) {
            role.permissions.forEach(permission => {
              rolePermissionsMap.set(permission.id, {
                id: permission.id,
                name: permission.nombre,
                description: permission.descripcion
              });
            });
          }
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          position_company: user.position_company,
          image: user.image,
          deleted: user.deleted,
          roles: user.roles.map(role => ({
            id: role.id,
            name: role.nombre,
            description: role.descripcion
          })),
          permissions: directPermissions,
          rolePermissions: Array.from(rolePermissionsMap.values())
        };
      });
    } catch (error) {
      this.logger.error(`Error al obtener usuarios: ${error}`);
      throw new HttpException(
        'Error al obtener usuarios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllPaginated(paginatedUsersDto: PaginatedUsersDto) {
    try {
      const { searchTerm, currentPage, itemsPerPage, sortColumn, sortDirection } = paginatedUsersDto;
      
      // Construir query builder
      const queryBuilder = this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'role')
        .leftJoinAndSelect('role.permissions', 'rolePermission')
        .leftJoinAndSelect('user.permissions', 'userPermission')
        .where('user.deleted = :deleted', { deleted: 0 }); // Filtrar usuarios no eliminados

      // Aplicar búsqueda
      if (searchTerm && searchTerm.trim() !== '') {
        queryBuilder.andWhere(
          '(user.name LIKE :searchTerm OR user.email LIKE :searchTerm OR user.position_company LIKE :searchTerm)',
          { searchTerm: `%${searchTerm}%` }
        );
      }

      // Aplicar ordenamiento
      if (sortColumn && sortDirection) {
        const direction = sortDirection.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        queryBuilder.orderBy(`user.${sortColumn}`, direction);
      } else {
        queryBuilder.orderBy('user.name', 'ASC');
      }

      // Calcular offset
      const skip = (currentPage - 1) * itemsPerPage;

      // Obtener total y datos paginados
      const [users, totalItems] = await queryBuilder
        .skip(skip)
        .take(itemsPerPage)
        .getManyAndCount();

      // Mapear usuarios para incluir información clara de roles y permisos
      const mappedUsers = users.map(user => {
        // Obtener permisos directos del usuario
        const directPermissions = user.permissions.map(permission => ({
          id: permission.id,
          name: permission.nombre,
          description: permission.descripcion
        }));

        // Obtener permisos que vienen de los roles
        const rolePermissionsMap = new Map();
        user.roles.forEach(role => {
          if (role.permissions) {
            role.permissions.forEach(permission => {
              rolePermissionsMap.set(permission.id, {
                id: permission.id,
                name: permission.nombre,
                description: permission.descripcion
              });
            });
          }
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          position_company: user.position_company,
          image: user.image,
          deleted: user.deleted,
          roles: user.roles.map(role => ({
            id: role.id,
            name: role.nombre,
            description: role.descripcion
          })),
          permissions: directPermissions,
          rolePermissions: Array.from(rolePermissionsMap.values())
        };
      });

      return {
        items: mappedUsers,
        totalItems,
        currentPage,
        itemsPerPage,
        totalPages: Math.ceil(totalItems / itemsPerPage)
      };
    } catch (error) {
      this.logger.error(`Error al obtener usuarios paginados: ${error}`);
      throw new HttpException(
        'Error al obtener usuarios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  // Gestión de roles
  async assignRole(userId: number, roleId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['roles']
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      // Verificar si el rol ya está asignado
      const hasRole = user.roles.some(role => role.id === roleId);
      if (hasRole) {
        throw new HttpException('El usuario ya tiene este rol', HttpStatus.BAD_REQUEST);
      }

      // Asignar rol mediante query directa con sintaxis SQL Server
      await this.dataSource.query(
        `INSERT INTO Converter_UsuariosRoles (usuario_id, rol_id) VALUES (@0, @1)`,
        [userId, roleId]
      );

      this.logger.log(`Rol ${roleId} asignado al usuario ${userId}`);
      return { status: 'Success', message: 'Rol asignado correctamente' };
    } catch (error) {
      this.logger.error(`Error al asignar rol: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error al asignar rol: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeRole(userId: number, roleId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['roles']
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      // Verificar si el usuario tiene el rol
      const hasRole = user.roles.some(role => role.id === roleId);
      if (!hasRole) {
        throw new HttpException('El usuario no tiene este rol', HttpStatus.BAD_REQUEST);
      }

      // Eliminar rol mediante query directa con sintaxis SQL Server
      await this.dataSource.query(
        `DELETE FROM Converter_UsuariosRoles WHERE usuario_id = @0 AND rol_id = @1`,
        [userId, roleId]
      );

      this.logger.log(`Rol ${roleId} removido del usuario ${userId}`);
      return { status: 'Success', message: 'Rol removido correctamente' };
    } catch (error) {
      this.logger.error(`Error al remover rol: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error al remover rol: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Gestión de permisos
  async assignPermission(userId: number, permissionId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['permissions']
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      // Verificar si el permiso ya está asignado
      const hasPermission = user.permissions.some(permission => permission.id === permissionId);
      if (hasPermission) {
        throw new HttpException('El usuario ya tiene este permiso', HttpStatus.BAD_REQUEST);
      }

      // Asignar permiso mediante query directa con sintaxis SQL Server
      await this.dataSource.query(
        `INSERT INTO Converter_UsuariosPermisos (Usuario_id, Permiso_id) VALUES (@0, @1)`,
        [userId, permissionId]
      );

      this.logger.log(`Permiso ${permissionId} asignado al usuario ${userId}`);
      return { status: 'Success', message: 'Permiso asignado correctamente' };
    } catch (error) {
      this.logger.error(`Error al asignar permiso: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error al asignar permiso: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removePermission(userId: number, permissionId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['permissions']
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      // Verificar si el usuario tiene el permiso
      const hasPermission = user.permissions.some(permission => permission.id === permissionId);
      if (!hasPermission) {
        throw new HttpException('El usuario no tiene este permiso', HttpStatus.BAD_REQUEST);
      }

      // Eliminar permiso mediante query directa con sintaxis SQL Server
      await this.dataSource.query(
        `DELETE FROM Converter_UsuariosPermisos WHERE Usuario_id = @0 AND Permiso_id = @1`,
        [userId, permissionId]
      );

      this.logger.log(`Permiso ${permissionId} removido del usuario ${userId}`);
      return { status: 'Success', message: 'Permiso removido correctamente' };
    } catch (error) {
      this.logger.error(`Error al remover permiso: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error al remover permiso: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId }
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      // Borrado lógico: actualizar el campo BajaEnERP a true
      await this.dataSource.query(
        `UPDATE Converter_Usuarios SET BajaEnERP = 1 WHERE Id = @0`,
        [userId]
      );

      this.logger.log(`Usuario ${userId} marcado como eliminado (borrado lógico)`);
      return { status: 'Success', message: 'Usuario eliminado correctamente' };
    } catch (error) {
      this.logger.error(`Error al eliminar usuario: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error al eliminar usuario: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
