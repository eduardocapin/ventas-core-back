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
import { KpisFilterDto } from './dto/kpis-filter.dto';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';

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

  @Get('kpis')
  @ApiOperation({ summary: 'KPIs de pedidos por estado de integración (sin filtros)' })
  @ApiResponse({ status: 200, description: 'Conteos por estado (clave = estado, valor = cantidad).' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getKpis() {
    try {
      return await this.pedidosService.getKpisByEstado();
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(`Error en GET pedidos/kpis: ${error}`);
      throw new HttpException(
        'Error en el servidor. Intenta de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('kpis')
  @ApiOperation({ summary: 'KPIs de pedidos por estado de integración (con filtros opcionales)' })
  @ApiBody({ type: KpisFilterDto, required: false })
  @ApiResponse({ status: 200, description: 'Conteos por estado (clave = estado, valor = cantidad).' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getKpisWithFilter(@Body() dto?: KpisFilterDto) {
    try {
      return await this.pedidosService.getKpisByEstado(dto?.empresasIds);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(`Error en POST pedidos/kpis: ${error}`);
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

  @Post('dashboard/top-clientes')
  @ApiOperation({ summary: 'Obtener top 10 clientes por valor total de pedidos' })
  @ApiBody({ type: DashboardFilterDto, required: false })
  @ApiResponse({ status: 200, description: 'Top 10 clientes' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getTop10Clientes(@Body() dto?: DashboardFilterDto) {
    try {
      return await this.pedidosService.getTop10Clientes(dto?.empresasIds, dto?.fechaDesde, dto?.fechaHasta);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(`Error en POST pedidos/dashboard/top-clientes: ${error}`);
      throw new HttpException(
        'Error en el servidor. Intenta de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('dashboard/top-productos')
  @ApiOperation({ summary: 'Obtener top 10 productos por cantidad y valor total vendido' })
  @ApiBody({ type: DashboardFilterDto, required: false })
  @ApiResponse({ status: 200, description: 'Top 10 productos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getTop10Productos(@Body() dto?: DashboardFilterDto) {
    try {
      return await this.pedidosService.getTop10Productos(dto?.empresasIds, dto?.fechaDesde, dto?.fechaHasta);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(`Error en POST pedidos/dashboard/top-productos: ${error}`);
      throw new HttpException(
        'Error en el servidor. Intenta de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('dashboard/top-pedidos')
  @ApiOperation({ summary: 'Obtener top 10 pedidos por valor total' })
  @ApiBody({ type: DashboardFilterDto, required: false })
  @ApiResponse({ status: 200, description: 'Top 10 pedidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getTop10Pedidos(@Body() dto?: DashboardFilterDto) {
    try {
      return await this.pedidosService.getTop10Pedidos(dto?.empresasIds, dto?.fechaDesde, dto?.fechaHasta);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      this.logger.error(`Error en POST pedidos/dashboard/top-pedidos: ${error}`);
      throw new HttpException(
        'Error en el servidor. Intenta de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
