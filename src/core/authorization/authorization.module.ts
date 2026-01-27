import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RoleRepository } from './repositories/role.repository';
import { PermissionRepository } from './repositories/permission.repository';

import { RolesGuard } from './guards/roles.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      Permission,
      User,
      RoleRepository,
      PermissionRepository,
      UserRepository
    ]),
  ],
  controllers: [AuthorizationController],
  providers: [
    AuthorizationService,
    RoleRepository,
    PermissionRepository,
    UserRepository,
    RolesGuard,
    PermissionsGuard
  ],
  exports: [
    AuthorizationService,
    RolesGuard,
    PermissionsGuard
  ],
})
export class AuthorizationModule {}
