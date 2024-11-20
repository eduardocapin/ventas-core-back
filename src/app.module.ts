import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { FiltersModule } from './filters/filters.module';
import { RejectsModule } from './rejects/rejects.module';

@Module({
  imports: [ProductsModule, UsersModule, ClientsModule, FiltersModule, RejectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
