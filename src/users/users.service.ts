import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
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
import { SessionService } from './services/session.service';
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
    private readonly sessionService: SessionService,
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
      const { selectedFilters, searchTerm, currentPage, itemsPerPage, sortColumn, sortDirection } = paginatedUsersDto;
      
      // Construir query builder
      const queryBuilder = this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'role')
        .leftJoinAndSelect('role.permissions', 'rolePermission')
        .leftJoinAndSelect('user.permissions', 'userPermission')
        .leftJoinAndSelect('user.empresas', 'empresa')
        .where('user.deleted = :deleted', { deleted: 0 }); // Filtrar usuarios no eliminados

      // Aplicar filtros dinámicos
      if (selectedFilters && Array.isArray(selectedFilters)) {
        selectedFilters.forEach((filter, index) => {
          const { id, valor, tipo } = filter;

          if (tipo === 'multi-select' && Array.isArray(valor)) {
            // Para filtros de roles
            if (id === 'role.id') {
              queryBuilder.andWhere(`role.id IN (:...roleValues${index})`, { 
                [`roleValues${index}`]: valor.map(v => v.id) 
              });
            }
            // Para filtros de permisos (directos del usuario)
            else if (id === 'userPermission.id') {
              queryBuilder.andWhere(`userPermission.id IN (:...permValues${index})`, { 
                [`permValues${index}`]: valor.map(v => v.id) 
              });
            }
            // Para filtros de permisos (incluyendo los de roles)
            else if (id === 'rolePermission.id') {
              queryBuilder.andWhere(`rolePermission.id IN (:...rolePermValues${index})`, { 
                [`rolePermValues${index}`]: valor.map(v => v.id) 
              });
            }
          }
        });
      }

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
          rolePermissions: Array.from(rolePermissionsMap.values()),
          empresas: user.empresas ? user.empresas.map(empresa => ({
            id: empresa.idEmpresa,
            nombre: empresa.Nombre
          })) : []
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

  async getActiveUsersCount(): Promise<number> {
    try {
      // Contar usuarios que NO están eliminados (deleted = false)
      const count = await this.userRepository.count({
        where: { deleted: false }
      });
      
      this.logger.log(`Conteo de usuarios activos: ${count}`);
      return count;
    } catch (error) {
      this.logger.error(`Error al contar usuarios activos: ${error}`);
      throw new HttpException(
        'Error al contar usuarios activos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password, roleIds, permissionIds, empresaIds, ...userData } = createUserDto;

    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      this.logger.warn(`El usuario con email (${email}) ya existe`)
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }

    // La contraseña viene encriptada con MD5 desde el frontend, la hasheamos con bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await this.userRepository.createUser({
      ...userData,
      email,
      password: hashedPassword,
    });

    // Asignar roles si se especificaron
    if (roleIds && roleIds.length > 0) {
      for (const roleId of roleIds) {
        try {
          await this.assignRole(newUser.id, roleId);
        } catch (error) {
          this.logger.warn(`No se pudo asignar el rol ${roleId} al usuario ${newUser.id}: ${error.message}`);
        }
      }
    }

    // Asignar permisos adicionales si se especificaron
    if (permissionIds && permissionIds.length > 0) {
      for (const permissionId of permissionIds) {
        try {
          await this.assignPermission(newUser.id, permissionId);
        } catch (error) {
          this.logger.warn(`No se pudo asignar el permiso ${permissionId} al usuario ${newUser.id}: ${error.message}`);
        }
      }
    }

    // Asignar empresas si se especificaron
    if (empresaIds && empresaIds.length > 0) {
      for (const empresaId of empresaIds) {
        try {
          await this.assignEmpresa(newUser.id, empresaId);
        } catch (error) {
          this.logger.warn(`No se pudo asignar la empresa ${empresaId} al usuario ${newUser.id}: ${error.message}`);
        }
      }
    }

    // Retornar el usuario con sus relaciones
    return this.findOneById(newUser.id);
  }

  async adminUpdate(userId: number, updateData: any) {
    // Buscar el usuario existente
    const user = await this.findOneById(userId);
    if (!user) {
      this.logger.warn(`No se ha encontrado el usuario con id: ${userId}`);
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    // Verificar si el email ya existe en otro usuario
    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await this.userRepository.findUserByEmail(updateData.email);
      if (existingUser && existingUser.id !== userId) {
        this.logger.warn(`El email (${updateData.email}) ya está en uso por otro usuario`);
        throw new HttpException('El email ya está en uso', HttpStatus.BAD_REQUEST);
      }
    }

    // Actualizar campos básicos
    if (updateData.name !== undefined) user.name = updateData.name;
    if (updateData.email !== undefined) user.email = updateData.email;
    if (updateData.position_company !== undefined) user.position_company = updateData.position_company;
    if (updateData.image !== undefined) user.image = updateData.image;

    // Actualizar contraseña si se proporcionó
    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      user.password = hashedPassword;
    }

    // Guardar cambios básicos
    await this.userRepository.save(user);

    // Actualizar roles si se especificaron
    if (updateData.roleIds !== undefined) {
      // Obtener roles actuales
      const currentRoles = user.roles.map(r => r.id);
      
      // Remover roles que ya no están
      const rolesToRemove = currentRoles.filter(id => !updateData.roleIds.includes(id));
      for (const roleId of rolesToRemove) {
        try {
          await this.removeRole(userId, roleId);
        } catch (error) {
          this.logger.warn(`No se pudo remover el rol ${roleId} del usuario ${userId}: ${error.message}`);
        }
      }
      
      // Añadir nuevos roles
      const rolesToAdd = updateData.roleIds.filter(id => !currentRoles.includes(id));
      for (const roleId of rolesToAdd) {
        try {
          await this.assignRole(userId, roleId);
        } catch (error) {
          this.logger.warn(`No se pudo asignar el rol ${roleId} al usuario ${userId}: ${error.message}`);
        }
      }
    }

    // Actualizar permisos si se especificaron
    if (updateData.permissionIds !== undefined) {
      // Obtener permisos actuales (solo directos, no los heredados de roles)
      const currentPermissions = user.permissions.map(p => p.id);
      
      // Remover permisos que ya no están
      const permsToRemove = currentPermissions.filter(id => !updateData.permissionIds.includes(id));
      for (const permId of permsToRemove) {
        try {
          await this.removePermission(userId, permId);
        } catch (error) {
          this.logger.warn(`No se pudo remover el permiso ${permId} del usuario ${userId}: ${error.message}`);
        }
      }
      
      // Añadir nuevos permisos
      const permsToAdd = updateData.permissionIds.filter(id => !currentPermissions.includes(id));
      for (const permId of permsToAdd) {
        try {
          await this.assignPermission(userId, permId);
        } catch (error) {
          this.logger.warn(`No se pudo asignar el permiso ${permId} al usuario ${userId}: ${error.message}`);
        }
      }
    }

    // Actualizar empresas si se especificaron
    if (updateData.empresaIds !== undefined) {
      // Obtener empresas actuales
      const currentEmpresas = user.empresas.map(e => e.idEmpresa);
      
      // Remover empresas que ya no están
      const empresasToRemove = currentEmpresas.filter(id => !updateData.empresaIds.includes(id));
      for (const empresaId of empresasToRemove) {
        try {
          await this.removeEmpresa(userId, empresaId);
        } catch (error) {
          this.logger.warn(`No se pudo remover la empresa ${empresaId} del usuario ${userId}: ${error.message}`);
        }
      }
      
      // Añadir nuevas empresas
      const empresasToAdd = updateData.empresaIds.filter(id => !currentEmpresas.includes(id));
      for (const empresaId of empresasToAdd) {
        try {
          await this.assignEmpresa(userId, empresaId);
        } catch (error) {
          this.logger.warn(`No se pudo asignar la empresa ${empresaId} al usuario ${userId}: ${error.message}`);
        }
      }
    }

    // Retornar el usuario actualizado con todas sus relaciones
    return this.findOneById(userId);
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

  async login(email: string, password: string, deviceInfo?: any) {
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
    const token = this.jwtService.sign(payload);

    // Crear sesión y desactivar sesiones anteriores automáticamente
    await this.sessionService.createSession(user.id, token, deviceInfo || {});

    return {
      msg: "Login exitoso",
      token,
      name: user.name,
      cargo: user.position_company,
      id: user.id,
      idioma: user.idioma || 'es' // Idioma por defecto español si es null
    };
  }

  async logout(token: string): Promise<void> {
    await this.sessionService.closeSession(token);
    this.logger.log('Sesión cerrada exitosamente');
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

  async updateUserLanguage(email: string, idioma: string) {
    // Validar idioma
    const validLanguages = ['es', 'en', 'ca'];
    if (!validLanguages.includes(idioma)) {
      this.logger.warn(`Idioma inválido: ${idioma}`);
      throw new HttpException('Idioma inválido. Debe ser: es, en o ca', HttpStatus.BAD_REQUEST);
    }

    const user = await this.findOneByEmail(email);
    if (!user) {
      this.logger.warn(`Usuario con email (${email}) no encontrado`);
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }

    user.idioma = idioma;
    const result = await this.userRepository.save(user);
    
    this.logger.log(`Idioma actualizado a '${idioma}' para usuario: ${email}`);
    return { status: 'Success', data: result, idioma };
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
        `INSERT INTO UsuariosRoles (usuario_id, rol_id) VALUES (@0, @1)`,
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
        `DELETE FROM UsuariosRoles WHERE usuario_id = @0 AND rol_id = @1`,
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
        `INSERT INTO UsuariosPermisos (Usuario_id, Permiso_id) VALUES (@0, @1)`,
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
        `DELETE FROM UsuariosPermisos WHERE Usuario_id = @0 AND Permiso_id = @1`,
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

  // Gestión de empresas
  async assignEmpresa(userId: number, empresaId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['empresas']
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      // Verificar si la empresa ya está asignada
      const hasEmpresa = user.empresas.some(empresa => empresa.idEmpresa === empresaId);
      if (hasEmpresa) {
        throw new HttpException('El usuario ya tiene esta empresa asignada', HttpStatus.BAD_REQUEST);
      }

      // Asignar empresa mediante query directa con sintaxis SQL Server
      await this.dataSource.query(
        `INSERT INTO UsuariosEmpresas (usuario_id, empresa_id) VALUES (@0, @1)`,
        [userId, empresaId]
      );

      this.logger.log(`Empresa ${empresaId} asignada al usuario ${userId}`);
      return { status: 'Success', message: 'Empresa asignada correctamente' };
    } catch (error) {
      this.logger.error(`Error al asignar empresa: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error al asignar empresa: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeEmpresa(userId: number, empresaId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['empresas']
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      // Verificar si el usuario tiene la empresa
      const hasEmpresa = user.empresas.some(empresa => empresa.idEmpresa === empresaId);
      if (!hasEmpresa) {
        throw new HttpException('El usuario no tiene esta empresa asignada', HttpStatus.BAD_REQUEST);
      }

      // Eliminar empresa mediante query directa con sintaxis SQL Server
      await this.dataSource.query(
        `DELETE FROM UsuariosEmpresas WHERE usuario_id = @0 AND empresa_id = @1`,
        [userId, empresaId]
      );

      this.logger.log(`Empresa ${empresaId} removida del usuario ${userId}`);
      return { status: 'Success', message: 'Empresa removida correctamente' };
    } catch (error) {
      this.logger.error(`Error al remover empresa: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error al remover empresa: ${error.message}`,
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

  /**
   * Obtener perfil completo del usuario actual con sus empresas
   */
  async getCurrentUserProfile(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['roles', 'roles.permissions', 'permissions', 'empresas']
      });

      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      // Obtener permisos de roles
      const rolePermissionsMap = new Map<number, any>();
      user.roles.forEach(role => {
        role.permissions?.forEach(permission => {
          if (!rolePermissionsMap.has(permission.id)) {
            rolePermissionsMap.set(permission.id, {
              id: permission.id,
              name: permission.nombre,
              description: permission.descripcion,
            });
          }
        });
      });

      // Permisos directos
      const directPermissions = user.permissions.map(p => ({
        id: p.id,
        name: p.nombre,
        description: p.descripcion,
      }));

      // Empresas
      const empresas = user.empresas ? user.empresas.map(empresa => ({
        id: empresa.idEmpresa,
        nombre: empresa.Nombre
      })) : [];

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        position_company: user.position_company,
        image: user.image,
        roles: user.roles.map(role => ({
          id: role.id,
          name: role.nombre,
          description: role.descripcion,
        })),
        permissions: directPermissions,
        rolePermissions: Array.from(rolePermissionsMap.values()),
        empresas: empresas
      };
    } catch (error) {
      this.logger.error(`Error al obtener perfil del usuario: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error al obtener perfil del usuario: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
