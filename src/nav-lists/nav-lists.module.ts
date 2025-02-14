import { Module } from '@nestjs/common';
import { NavListsService } from './nav-lists.service';
import { NavListsController } from './nav-lists.controller';
import { NavListsRepository } from './repositories/nav-list.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListItem } from './entities/nav-list.entity';

@Module({
   imports: [TypeOrmModule.forFeature([ListItem,NavListsRepository]),],
  controllers: [NavListsController],
  providers: [NavListsService, NavListsRepository],
})
export class NavListsModule {}
