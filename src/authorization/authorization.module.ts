import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RoleRepository } from './repositories/role.repository';
import { PermissionRepository } from './repositories/permission.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { User } from 'src/users/entities/user.entity';
import { RolesGuard } from './guards/roles.guard';
import { PermissionsGuard } from './guards/permissions.guard';

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
