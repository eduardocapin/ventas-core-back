import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { SessionService } from '../../users/services/session.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return true; // Dejar pasar, JwtAuthGuard ya manejará esto
    }

    const token = authHeader.substring(7);

    const isValid = await this.sessionService.validateSession(token);

    if (!isValid) {
      throw new UnauthorizedException({
        message: 'Tu sesión ha sido cerrada porque iniciaste sesión en otro dispositivo',
        code: 'SESSION_INVALIDATED',
        statusCode: 401
      });
    }

    return true;
  }
}
