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
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UtilitiesService } from './shared/utilities/utilities.service';
import { MailService } from './shared/mail/mail.service';
import { RepositoriesModule } from './repositories/repositories.module';
import { SharedModule } from './shared/shared.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,  // Esto hace que las variables de entorno estén disponibles globalmente
  }),
  TypeOrmModule.forRootAsync({
    useFactory: () => {
      const entitiesPath = __dirname + '/**/*.entity{.ts,.js}';
      console.log(`Entities Path: ${entitiesPath}`);
      return {
        type: (process.env.DB_TYPE as 'mysql' | 'mssql' | 'postgres' | 'sqlite') || 'mysql',
        host: process.env.DB_HOST || '172.17.0.1',
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME || 'mobentis',
        password: process.env.DB_PASSWORD || 'msbs',
        database: process.env.DB_NAME || 'db_rechazos',
        entities: [entitiesPath],
        synchronize: false,
      };
    }
  }),
    ClientsModule, CompetitorsModule, FiltersModule, MenusModule, NavListsModule, ProductsModule, ReasonsRejectionModule, RejectsModule, UsersModule, ImportModule, RepositoriesModule, SharedModule
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
