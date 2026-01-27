import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'MaVk9%%)r[^8533g&pv',
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOneById(payload.sub);
    if (!user) {
      throw new Error('User not found');
    }

    // Obtener todos los permisos: directos y de roles
    const allPermissions = new Set<string>();
    
    // Agregar permisos directos del usuario
    if (user.permissions) {
      user.permissions.forEach(p => allPermissions.add(p.nombre));
    }

    // Agregar permisos de los roles del usuario
    if (user.roles) {
      user.roles.forEach(role => {
        if (role.permissions) {
          role.permissions.forEach(p => allPermissions.add(p.nombre));
        }
      });
    }

    // Obtener nombres de roles
    const roleNames = user.roles ? user.roles.map(r => r.nombre) : [];

    return { 
      userId: payload.sub, 
      email: payload.email,
      roles: roleNames,
      permissions: Array.from(allPermissions)
    };
  }
}
