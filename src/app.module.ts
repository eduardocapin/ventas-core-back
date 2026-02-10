import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FiltersModule } from './filters/filters.module';
import { MenusModule } from './menus/menus.module';
import { NavListsModule } from './nav-lists/nav-lists.module';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { ConfigurationModule } from './core/configuration/configuration.module';

import { EmpresasModule } from './core/empresas/empresas.module';
import { SessionGuard } from './core/guards/session/session.guard';
import { RepositoriesModule } from './core/repositories/repositories.module';
import { AuthorizationModule } from './core/authorization/authorization.module';
import { CorsMiddleware } from './core/middleware/cors/cors.middleware';
import { CompressionMiddleware } from './core/middleware/compression/compression.middleware';
import { UsersModule } from './core/users/users.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,  // Esto hace que las variables de entorno estén disponibles globalmente
    envFilePath: '.env'
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
        //synchronize: false,
        synchronize: false,
        options: {
          trustServerCertificate: true, 
          encrypt: false, // Si usas Azure, puedes necesitar habilitar esto
        },
      };
    }
  }),
     FiltersModule, MenusModule, NavListsModule, UsersModule, PedidosModule, ClientsModule, RepositoriesModule, SharedModule, ConfigurationModule, EmpresasModule, AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: SessionGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware, CompressionMiddleware)
      .forRoutes('*');
  }
}
