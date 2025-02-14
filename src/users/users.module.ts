import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { MailService } from 'src/shared/mail/mail.service';
import { UtilitiesService } from 'src/shared/utilities/utilities.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'MaVk9%%)r[^8533g&pv',
      signOptions: { expiresIn: '24h' },
      
    }),
    SharedModule


  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, JwtStrategy,],
  exports: [UserRepository],
})
export class UsersModule { }
