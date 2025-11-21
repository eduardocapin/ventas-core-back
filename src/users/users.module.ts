import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { UserSession } from './entities/user-session.entity';
import { UserSessionRepository } from './repositories/user-session.repository';
import { SessionService } from './services/session.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSession, UserRepository, UserSessionRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'MaVk9%%)r[^8533g&pv',
      signOptions: { expiresIn: '24h' },
      
    }),
    SharedModule


  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserSessionRepository, SessionService, JwtStrategy],
  exports: [UserRepository, SessionService],
})
export class UsersModule { }
