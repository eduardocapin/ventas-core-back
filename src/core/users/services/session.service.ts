import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSessionRepository } from '../repositories/user-session.repository';
import { UserSession } from '../entities/user-session.entity';
import * as crypto from 'crypto';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    @InjectRepository(UserSessionRepository)
    private readonly sessionRepository: UserSessionRepository,
  ) {}

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async createSession(
    userId: number,
    token: string,
    deviceInfo: any,
  ): Promise<UserSession> {
    const sessionToken = this.hashToken(token);

    // Desactivar todas las sesiones anteriores del usuario
    await this.sessionRepository.deactivateOtherSessions(userId);
    this.logger.log(`Sesiones anteriores desactivadas para usuario ID: ${userId}`);

    // Crear nueva sesión
    const session = this.sessionRepository.create({
      userId,
      sessionToken,
      deviceInfo: JSON.stringify(deviceInfo),
      lastActivity: new Date(),
      isActive: true,
    });

    const savedSession = await this.sessionRepository.save(session);
    this.logger.log(`Nueva sesión creada para usuario ID: ${userId}`);

    return savedSession;
  }

  async validateSession(token: string): Promise<boolean> {
    const sessionToken = this.hashToken(token);
    const session = await this.sessionRepository.findActiveByToken(sessionToken);

    if (!session) {
      this.logger.warn(`Sesión inválida o inactiva`);
      return false;
    }

    // Actualizar última actividad
    await this.sessionRepository.updateLastActivity(sessionToken);
    return true;
  }

  async closeSession(token: string): Promise<void> {
    const sessionToken = this.hashToken(token);
    await this.sessionRepository.update({ sessionToken }, { isActive: false });
    this.logger.log(`Sesión cerrada`);
  }

  async getActiveSessions(userId: number): Promise<UserSession[]> {
    return this.sessionRepository.findActiveByUserId(userId);
  }

  async closeAllSessions(userId: number): Promise<void> {
    await this.sessionRepository.deactivateOtherSessions(userId);
    this.logger.log(`Todas las sesiones cerradas para usuario ID: ${userId}`);
  }
}
