import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'MaVk9%%)r[^8533g&pv',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
