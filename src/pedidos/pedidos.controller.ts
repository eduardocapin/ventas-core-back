import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth/jwt-auth.guard';
import { PedidosService } from './pedidos.service';
import { PaginatedPedidosDto } from './dto/paginated-pedidos.dto';

@ApiTags('Pedidos')
@Controller('pedidos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PedidosController {
  private readonly logger = new Logger(PedidosController.name);

  constructor(private readonly pedidosService: PedidosService) {}

  @Post('list')
  @ApiOperation({ summary: 'Listado paginado de pedidos (Importador de Documentos)' })
  @ApiBody({ type: PaginatedPedidosDto })
  @ApiResponse({ status: 200, description: 'Lista de pedidos con totalItems.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findAll(@Body() dto: PaginatedPedidosDto) {
    try {
      return await this.pedidosService.findAllPaginated(dto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(`Error en POST pedidos/list: ${error}`);
      throw new HttpException(
        'Error en el servidor. Intenta de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de un pedido con líneas y observaciones' })
  @ApiParam({ name: 'id', description: 'ID del pedido' })
  @ApiResponse({ status: 200, description: 'Pedido con líneas.' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.pedidosService.findOne(id);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(`Error en GET pedidos/${id}: ${error}`);
      throw new HttpException(
        'Error en el servidor. Intenta de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
