import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MenusRepository } from './repositories/menus.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem,MenusRepository]),],
  controllers: [MenusController],
  providers: [MenusService, MenusRepository],
})
export class MenusModule {}
