import { Module } from '@nestjs/common';
import { NavListsService } from './nav-lists.service';
import { NavListsController } from './nav-lists.controller';

@Module({
  controllers: [NavListsController],
  providers: [NavListsService],
})
export class NavListsModule {}
