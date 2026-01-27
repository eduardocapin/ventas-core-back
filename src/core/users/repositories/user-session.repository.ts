import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserSession } from '../entities/user-session.entity';

@Injectable()
export class UserSessionRepository extends Repository<UserSession> {
  constructor(private dataSource: DataSource) {
    super(UserSession, dataSource.createEntityManager());
  }

  async findActiveByToken(sessionToken: string): Promise<UserSession | null> {
    return this.findOne({
      where: { sessionToken, isActive: true },
    });
  }

  async findActiveByUserId(userId: number): Promise<UserSession[]> {
    return this.find({
      where: { userId, isActive: true },
      order: { lastActivity: 'DESC' },
    });
  }

  async deactivateOtherSessions(userId: number, exceptSessionToken?: string): Promise<void> {
    const query = this.createQueryBuilder()
      .update(UserSession)
      .set({ isActive: false })
      .where('UserId = :userId', { userId })
      .andWhere('IsActive = 1');

    if (exceptSessionToken) {
      query.andWhere('SessionToken != :sessionToken', { sessionToken: exceptSessionToken });
    }

    await query.execute();
  }

  async updateLastActivity(sessionToken: string): Promise<void> {
    await this.update({ sessionToken }, { lastActivity: new Date() });
  }
}
