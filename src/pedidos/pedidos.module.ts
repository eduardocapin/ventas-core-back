import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoDetalle } from './entities/pedido-detalle.entity';
import { PedidosTotal } from './entities/pedidos-total.entity';
import { Client } from '../clients/entities/client.entity';
import { PedidoRepository } from './repositories/pedido.repository';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, PedidoDetalle, PedidosTotal, Client]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService, PedidoRepository],
  exports: [PedidosService],
})
export class PedidosModule {}
