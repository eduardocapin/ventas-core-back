import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CompetitorsModule } from './competitors/competitors.module';
import { FiltersModule } from './filters/filters.module';
import { MenusModule } from './menus/menus.module';
import { NavListsModule } from './nav-lists/nav-lists.module';
import { ProductsModule } from './products/products.module';
import { ReasonsRejectionModule } from './reasons-rejection/reasons-rejection.module';
import { RejectsModule } from './rejects/rejects.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [ClientsModule, CompetitorsModule, FiltersModule, MenusModule, NavListsModule, ProductsModule, ReasonsRejectionModule, RejectsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
