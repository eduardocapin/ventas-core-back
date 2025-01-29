import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { ConfigModule } from '@nestjs/config';
import { CorsMiddleware } from './middleware/cors/cors.middleware';
import { CompressionMiddleware } from './middleware/compression/compression.middleware';
import { ImportModule } from './import/import.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,  // Esto hace que las variables de entorno estén disponibles globalmente
  }),
    ClientsModule, CompetitorsModule, FiltersModule, MenusModule, NavListsModule, ProductsModule, ReasonsRejectionModule, RejectsModule, UsersModule, ImportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware, CompressionMiddleware)
      .forRoutes('*'); 
  }
}
