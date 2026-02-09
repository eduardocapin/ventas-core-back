import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoRepository } from './repositories/pedido.repository';
import { PaginatedPedidosDto } from './dto/paginated-pedidos.dto';
import { PedidoListDto } from './dto/pedido-list.dto';
import { PedidoDetalleDto } from './dto/pedido-detalle.dto';
import { PedidoDetalleLineaDto } from './dto/pedido-detalle-linea.dto';

@Injectable()
export class PedidosService {
  private readonly logger = new Logger(PedidosService.name);

  constructor(
    @InjectRepository(PedidoRepository)
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  /**
   * Listado paginado para el Importador de Documentos.
   * Respuesta: { items: PedidoListDto[]; totalItems: number }
   */
  async findAllPaginated(dto: PaginatedPedidosDto): Promise<{ items: PedidoListDto[]; totalItems: number }> {
    try {
      const [pedidos, totalItems] = await this.pedidoRepository.findPaginated({
        currentPage: dto.currentPage,
        itemsPerPage: dto.itemsPerPage,
        searchTerm: dto.searchTerm,
        selectedFilters: dto.selectedFilters,
        sortColumn: dto.sortColumn,
        sortDirection: dto.sortDirection,
      });

      const items: PedidoListDto[] = pedidos.map((p) => ({
        id: p.id,
        tipoDocumento: p.tipoDocumento ?? undefined,
        numero: p.numero ?? undefined,
        cliente: p.cliente ?? undefined,
        agente: p.agente ?? undefined,
        fecha: p.fecha ?? undefined,
        delegacion: p.delegacion ?? undefined,
        estadoIntegracion: p.estadoIntegracion ?? undefined,
        mensajeErrorIntegracion: p.mensajeErrorIntegracion ?? undefined,
      }));

      return { items, totalItems };
    } catch (error) {
      this.logger.error(`Error al obtener listado de pedidos: ${error}`);
      throw new HttpException(
        'Error al obtener el listado de pedidos. Intenta de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Detalle de un pedido con sus líneas y observaciones.
   */
  async findOne(id: number): Promise<PedidoDetalleDto> {
    const pedido = await this.pedidoRepository.findByIdWithLineas(id);
    if (!pedido) {
      throw new HttpException('Pedido no encontrado.', HttpStatus.NOT_FOUND);
    }

    const lineas: PedidoDetalleLineaDto[] = (pedido.lineas || [])
      .filter((l) => !l.deleted)
      .map((l) => ({
        id: l.id,
        referencia: l.referencia ?? undefined,
        descripcion: l.descripcion ?? undefined,
        unidades: Number(l.unidades),
        precio: Number(l.precio),
        descuento: Number(l.descuento),
        total: Number(l.total),
      }));

    return {
      id: pedido.id,
      tipoDocumento: pedido.tipoDocumento ?? undefined,
      numero: pedido.numero ?? undefined,
      cliente: pedido.cliente ?? undefined,
      agente: pedido.agente ?? undefined,
      fecha: pedido.fecha ?? undefined,
      delegacion: pedido.delegacion ?? undefined,
      estadoIntegracion: pedido.estadoIntegracion ?? undefined,
      mensajeErrorIntegracion: pedido.mensajeErrorIntegracion ?? undefined,
      observaciones: pedido.observaciones ?? undefined,
      lineas,
    };
  }
}
