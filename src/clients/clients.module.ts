import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

/**
 * Módulo de clientes. Entidad y DTO alineados con [dbo].[Clientes].
 */
@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  exports: [TypeOrmModule],
})
export class ClientsModule {}
