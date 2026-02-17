import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidosTotal } from './entities/pedidos-total.entity';
import { PedidoDetalle } from './entities/pedido-detalle.entity';
import { Client } from '../clients/entities/client.entity';
import { PedidoRepository } from './repositories/pedido.repository';
import { PaginatedPedidosDto } from './dto/paginated-pedidos.dto';
import { PedidoListDto } from './dto/pedido-list.dto';
import { PedidoDetalleDto } from './dto/pedido-detalle.dto';
import { PedidoDetalleLineaDto } from './dto/pedido-detalle-linea.dto';
import { PedidoAgenteDto } from './dto/pedido-agente.dto';
import { PedidoTotalesDto } from './dto/pedido-totales.dto';
import { PedidoClienteDto } from './dto/pedido-cliente.dto';
import { PedidoDireccionDto } from './dto/pedido-direccion.dto';
import { DashboardTopClienteDto, DashboardTopClientesResponseDto } from './dto/dashboard-top-clientes.dto';
import { DashboardTopProductoDto, DashboardTopProductosResponseDto } from './dto/dashboard-top-productos.dto';
import { DashboardTopPedidoDto, DashboardTopPedidosResponseDto } from './dto/dashboard-top-pedidos.dto';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';

export type PedidosKpisByEstado = Record<string, number>;

/** Mapea Client (relación Cod_Agente_Fabricante → Clientes.Id) a PedidoAgenteDto para compatibilidad API. */
function mapClienteToAgenteDto(c: Client | null | undefined): PedidoAgenteDto | undefined {
  if (!c) return undefined;
  return {
    id: c.id,
    nombre: c.nombre ?? undefined,
    codigoAgenteFabricante: c.idClienteFabricante ?? undefined,
    codigoAgenteERP: c.idClienteERP ?? undefined,
  };
}

/** Mapea Client (cliente comprador, Cod_Cliente_Fabricante → Clientes.IdClienteFabricante) a PedidoClienteDto. */
function mapCustomerToClienteDto(c: Client | null | undefined): PedidoClienteDto | undefined {
  if (!c) return undefined;
  return {
    codigo: c.idClienteFabricante ?? undefined,
    nombreComercial: c.nombre ?? undefined,
    nombreFiscal: c.nombreFiscal ?? undefined,
    cif: c.cif ?? undefined,
    direccion: c.direccion ?? undefined,
    poblacion: c.poblacion ?? undefined,
    provincia: c.provincia ?? undefined,
    telefono: c.telefono ?? undefined,
    fax: c.fax ?? undefined,
    email: c.mail ?? undefined,
    banco: c.banco ?? undefined,
    cuenta: c.cuenta ?? undefined,
  };
}

/** Mapea columnas de dirección del pedido a PedidoDireccionDto. */
function mapPedidoToDireccionDto(p: Pedido): PedidoDireccionDto {
  return {
    nombre: p.cliente ?? undefined,
    direccion: p.clienteDirec ?? undefined,
    contacto: undefined,
    poblacion: p.clientePobla ?? undefined,
    provincia: p.clienteProvin ?? undefined,
    cp: p.clienteDP ?? undefined,
    tfno: p.clienteTelefono ?? undefined,
  };
}

/** Extrae la parte hora de un Date en formato HH:mm. */
function formatTimeFromDate(d: Date | null | undefined): string | undefined {
  if (!d) return undefined;
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return undefined;
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

function mapTotalesToDto(t: PedidosTotal | null | undefined): PedidoTotalesDto | undefined {
  if (!t) return undefined;
  return {
    idPedidosTotalOPT: t.idPedidosTotalOPT,
    subtotal: t.subtotal ?? undefined,
    dtos: t.dtos ?? undefined,
    baseImp: t.baseImp ?? undefined,
    ivaPor: t.ivaPor ?? undefined,
    ivaCuota: t.ivaCuota ?? undefined,
    rePor: t.rePor ?? undefined,
    reCuota: t.reCuota ?? undefined,
    impuestosTotal: t.impuestosTotal ?? undefined,
    total: t.total ?? undefined,
  };
}

@Injectable()
export class PedidosService {
  private readonly logger = new Logger(PedidosService.name);

  constructor(
    private readonly pedidoRepository: PedidoRepository,
    @InjectRepository(Pedido)
    private readonly pedidoRepo: Repository<Pedido>,
    @InjectRepository(PedidosTotal)
    private readonly pedidosTotalRepo: Repository<PedidosTotal>,
    @InjectRepository(PedidoDetalle)
    private readonly pedidoDetalleRepo: Repository<PedidoDetalle>,
  ) {}

  /**
   * Listado paginado para el Importador de Documentos.
   * Respuesta: { items: PedidoListDto[]; totalItems: number }
   */
  async findAllPaginated(dto: PaginatedPedidosDto): Promise<{ items: PedidoListDto[]; totalItems: number }> {
    try {
      // Extraer filtro de estado de selectedFilters si existe
      let estadoImportacion: string[] | undefined;
      if (dto.selectedFilters && Array.isArray(dto.selectedFilters)) {
        const estadoFilter = dto.selectedFilters.find((f: any) => f.id === 'estadoImportacion');
        if (estadoFilter && Array.isArray(estadoFilter.valor)) {
          estadoImportacion = estadoFilter.valor;
        }
      }
      // También verificar si viene directamente en el body
      if ((dto as any).estadoImportacion && Array.isArray((dto as any).estadoImportacion)) {
        estadoImportacion = (dto as any).estadoImportacion;
      }

      const [pedidos, totalItems] = await this.pedidoRepository.findPaginated({
        currentPage: dto.currentPage,
        itemsPerPage: dto.itemsPerPage,
        searchTerm: dto.searchTerm,
        selectedFilters: dto.selectedFilters,
        sortColumn: dto.sortColumn,
        sortDirection: dto.sortDirection,
        empresasIds: dto.empresasIds,
        estadoImportacion,
        fechaDesde: dto.fechaDesde,
        fechaHasta: dto.fechaHasta,
      });

      const items: PedidoListDto[] = pedidos.map((p) => {
        const cliente = p.clienteRelation;
        const agenteDto = mapClienteToAgenteDto(cliente);
        const nombreAgente = p.agente ?? cliente?.nombre ?? undefined;
        const codigoAgente = agenteDto?.codigoAgenteFabricante ?? agenteDto?.codigoAgenteERP ?? undefined;
        const nombreEmpresa = p.empresaRelation?.Nombre ?? undefined;
        return {
          id: p.id,
          estadoImportacion: p.estadoIntegracion ?? undefined,
          idDocumentoPDA: p.idDocumentoPDA ?? undefined,
          tipoDocumento: p.tipoDocumento ?? undefined,
          fechaDocumento: p.fecha ?? undefined,
          horaConsolidacion: formatTimeFromDate(p.fechaHoraFin) ?? undefined,
          fechaEntrega: p.fechaEntrega ?? undefined,
          codigoCliente: p.codigoCliente ?? cliente?.idClienteFabricante ?? undefined,
          clienteNFiscal: cliente?.nombreFiscal ?? p.cliente ?? undefined,
          nombreAgente: nombreAgente ?? undefined,
          codigoAgente: codigoAgente ?? undefined,
          nombreEmpresa: nombreEmpresa ?? undefined,
          dto1: p.totales?.dtos ?? undefined,
          dto2: undefined,
          dtoPP: undefined,
          importe: p.totales?.subtotal ?? undefined,
          total: p.totales?.total ?? undefined,
          tieneFirma: undefined,
          errorIntegracion: p.mensajeErrorIntegracion ?? undefined,
          idPedidoTipoERP: p.totales?.idPedidoERP ?? undefined,
          agenteDatos: agenteDto,
          totales: mapTotalesToDto(p.totales),
          tipoPedido: p.tipoDocumento ?? undefined,
          codigoDocumento: p.numero ?? undefined,
          numero: p.numero ?? undefined,
          nombreCliente: p.cliente ?? cliente?.nombre ?? undefined,
          cliente: p.cliente ?? undefined,
          agente: nombreAgente ?? undefined,
          fecha: p.fecha ?? undefined,
          delegacion: p.delegacion ?? undefined,
          origen: p.delegacion ?? undefined,
          observaciones: p.observaciones ?? undefined,
          nota: p.observaciones ?? undefined,
          estadoIntegracion: p.estadoIntegracion ?? undefined,
          mensajeErrorIntegracion: p.mensajeErrorIntegracion ?? undefined,
          codigoPda: p.totales?.idPedidoPDA ?? undefined,
          importeDescuento1: p.totales?.dtos ?? undefined,
          importeDescuento2: undefined,
          importeDescuentoDToPP: undefined,
        };
      });

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
        comboIntegracion: l.estadoIntegracion ?? undefined,
        codigoArticulo: l.referencia ?? undefined,
        descripcionArticulo: l.descripcion ?? undefined,
        codigoPromocion: undefined,
        unidadesVendidas: Number(l.unidades),
        descripcionUnidadVendida: undefined,
        importe: Number(l.precio),
        descuento1: Number(l.descuento),
        descuento2: undefined,
        descuento3: undefined,
        descuento4: undefined,
        descuento5: undefined,
        total: Number(l.total),
        motivoDevolucion: undefined,
        comboAdjunto: undefined,
        notaLinea: undefined,
        errorIntegracion: l.mensajeErrorIntegracion ?? undefined,
        referencia: l.referencia ?? undefined,
        descripcion: l.descripcion ?? undefined,
        unidades: Number(l.unidades),
        precio: Number(l.precio),
        descuento: Number(l.descuento),
        estadoIntegracion: l.estadoIntegracion ?? undefined,
        mensajeErrorIntegracion: l.mensajeErrorIntegracion ?? undefined,
      }));

    return {
      id: pedido.id,
      tipoDocumento: pedido.tipoDocumento ?? undefined,
      numero: pedido.numero ?? undefined,
      cliente: pedido.cliente ?? undefined,
      agente: pedido.agente ?? (pedido.clienteRelation?.nombre ?? undefined),
      agenteDatos: mapClienteToAgenteDto(pedido.clienteRelation),
      clienteDatos: mapCustomerToClienteDto(pedido.customerRelation),
      datosDireccion: mapPedidoToDireccionDto(pedido),
      fecha: pedido.fecha ?? undefined,
      delegacion: pedido.delegacion ?? undefined,
      estadoIntegracion: pedido.estadoIntegracion ?? undefined,
      mensajeErrorIntegracion: pedido.mensajeErrorIntegracion ?? undefined,
      observaciones: pedido.observaciones ?? undefined,
      observacionesComerciales: pedido.observacionesComerciales ?? undefined,
      observacionesReparto: pedido.observacionesReparto ?? undefined,
      nombreEmpresa: pedido.empresaRelation?.Nombre ?? undefined,
      formaPago: pedido.medioPagoRelation?.nombreMedio ?? undefined,
      totales: mapTotalesToDto(pedido.totales),
      lineas,
    };
  }

  /**
   * KPIs por estado de integración para el Importador de Documentos.
   * Devuelve un objeto { [estado: string]: number }.
   * @param empresasIds Opcional: IDs de empresas para filtrar los KPIs
   */
  async getKpisByEstado(empresasIds?: number[]): Promise<PedidosKpisByEstado> {
    try {
      const qb = this.pedidoRepo
        .createQueryBuilder('p')
        .select('p.EstadoImportacion', 'estado')
        .addSelect('COUNT(*)', 'count')
        .where('(p.BajaEnERP = :falseVal OR p.BajaEnERP IS NULL)')
        .setParameter('falseVal', false);

      // Aplicar filtro de empresas si se proporciona
      if (empresasIds && empresasIds.length > 0) {
        qb.andWhere('p.Cod_Empresa IN (:...empresasIds)');
        qb.setParameter('empresasIds', empresasIds);
      }

      const rows = await qb
        .groupBy('p.EstadoImportacion')
        .getRawMany<{ estado: string | null; count: string }>();

      const kpis: PedidosKpisByEstado = {};
      for (const row of rows) {
        const key = row.estado ?? 'sin_estado';
        kpis[key] = parseInt(row.count, 10) || 0;
      }
      return kpis;
    } catch (error) {
      this.logger.error(`Error al obtener KPIs de pedidos: ${error}`);
      throw new HttpException(
        'Error al obtener los KPIs de pedidos. Intenta de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtiene los top 10 clientes por valor total de pedidos
   * @param empresasIds Filtro opcional por empresas
   * @param fechaDesde Filtro opcional: pedidos desde esta fecha (inclusive)
   * @param fechaHasta Filtro opcional: pedidos hasta esta fecha (inclusive)
   */
  async getTop10Clientes(
    empresasIds?: number[],
    fechaDesde?: string,
    fechaHasta?: string,
  ): Promise<DashboardTopClientesResponseDto> {
    try {
      const queryBuilder = this.pedidoRepo
        .createQueryBuilder('p')
        .leftJoin('p.totales', 't')
        .leftJoin('p.clienteRelation', 'c')
        .select('c.id', 'clienteId')
        .addSelect('COALESCE(c.nombre, p.cliente, \'Sin nombre\')', 'nombreCliente')
        .addSelect('COUNT(DISTINCT p.id)', 'totalPedidos')
        .addSelect('COALESCE(SUM(t.total), 0)', 'valorTotal')
        .where('(p.deleted = :falseVal OR p.deleted IS NULL)', { falseVal: false })
        .andWhere('(t.bajaEnERP = :falseVal OR t.bajaEnERP IS NULL)', { falseVal: false })
        .andWhere('c.id IS NOT NULL')
        .groupBy('c.id')
        .addGroupBy('c.nombre')
        .addGroupBy('p.cliente')
        .orderBy('valorTotal', 'DESC')
        .limit(10);

      if (empresasIds && empresasIds.length > 0) {
        queryBuilder.andWhere('p.codEmpresa IN (:...empresasIds)', { empresasIds });
      }
      if (fechaDesde) {
        queryBuilder.andWhere('p.fecha >= :fechaDesde', { fechaDesde });
      }
      if (fechaHasta) {
        queryBuilder.andWhere('p.fecha <= :fechaHasta', { fechaHasta });
      }

      const results = await queryBuilder.getRawMany();

      const items: DashboardTopClienteDto[] = results.map((r) => ({
        clienteId: r.clienteId,
        nombreCliente: r.nombreCliente || 'Sin nombre',
        totalPedidos: parseInt(r.totalPedidos) || 0,
        valorTotal: parseFloat(r.valorTotal) || 0,
      }));

      return { items };
    } catch (error) {
      this.logger.error(`Error al obtener top 10 clientes: ${error}`);
      throw new HttpException(
        'Error al obtener los top 10 clientes. Intenta de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtiene los top 10 productos por cantidad y valor total vendido
   * @param empresasIds Filtro opcional por empresas
   * @param fechaDesde Filtro opcional: pedidos desde esta fecha (inclusive)
   * @param fechaHasta Filtro opcional: pedidos hasta esta fecha (inclusive)
   */
  async getTop10Productos(
    empresasIds?: number[],
    fechaDesde?: string,
    fechaHasta?: string,
  ): Promise<DashboardTopProductosResponseDto> {
    try {
      const queryBuilder = this.pedidoDetalleRepo
        .createQueryBuilder('pd')
        .leftJoin('pd.pedido', 'p')
        .select('pd.referencia', 'referencia')
        .addSelect('COALESCE(pd.descripcion, \'Sin descripción\')', 'descripcion')
        .addSelect('COALESCE(SUM(pd.unidades), 0)', 'cantidadTotal')
        .addSelect('COALESCE(SUM(pd.total), 0)', 'valorTotal')
        .where('(pd.deleted = :falseVal OR pd.deleted IS NULL)', { falseVal: false })
        .andWhere('(p.deleted = :falseVal OR p.deleted IS NULL)', { falseVal: false })
        .andWhere('pd.referencia IS NOT NULL')
        .groupBy('pd.referencia')
        .addGroupBy('pd.descripcion')
        .orderBy('valorTotal', 'DESC')
        .limit(10);

      if (empresasIds && empresasIds.length > 0) {
        queryBuilder.andWhere('p.codEmpresa IN (:...empresasIds)', { empresasIds });
      }
      if (fechaDesde) {
        queryBuilder.andWhere('p.fecha >= :fechaDesde', { fechaDesde });
      }
      if (fechaHasta) {
        queryBuilder.andWhere('p.fecha <= :fechaHasta', { fechaHasta });
      }

      const results = await queryBuilder.getRawMany();

      const items: DashboardTopProductoDto[] = results.map((r) => ({
        referencia: r.referencia || 'Sin referencia',
        descripcion: r.descripcion || 'Sin descripción',
        cantidadTotal: parseFloat(r.cantidadTotal) || 0,
        valorTotal: parseFloat(r.valorTotal) || 0,
      }));

      return { items };
    } catch (error) {
      this.logger.error(`Error al obtener top 10 productos: ${error}`);
      throw new HttpException(
        'Error al obtener los top 10 productos. Intenta de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtiene los top 10 pedidos por valor total
   * @param empresasIds Filtro opcional por empresas
   * @param fechaDesde Filtro opcional: pedidos desde esta fecha (inclusive)
   * @param fechaHasta Filtro opcional: pedidos hasta esta fecha (inclusive)
   */
  async getTop10Pedidos(
    empresasIds?: number[],
    fechaDesde?: string,
    fechaHasta?: string,
  ): Promise<DashboardTopPedidosResponseDto> {
    try {
      const queryBuilder = this.pedidoRepo
        .createQueryBuilder('p')
        .leftJoin('p.totales', 't')
        .select('p.id', 'pedidoId')
        .addSelect('COALESCE(p.idDocumentoPDA, \'Sin número\')', 'numero')
        .addSelect('COALESCE(p.cliente, \'Sin cliente\')', 'nombreCliente')
        .addSelect('p.fecha', 'fecha')
        .addSelect('COALESCE(t.total, 0)', 'valorTotal')
        .where('(p.deleted = :falseVal OR p.deleted IS NULL)', { falseVal: false })
        .andWhere('(t.bajaEnERP = :falseVal OR t.bajaEnERP IS NULL)', { falseVal: false })
        .orderBy('valorTotal', 'DESC')
        .limit(10);

      if (empresasIds && empresasIds.length > 0) {
        queryBuilder.andWhere('p.codEmpresa IN (:...empresasIds)', { empresasIds });
      }
      if (fechaDesde) {
        queryBuilder.andWhere('p.fecha >= :fechaDesde', { fechaDesde });
      }
      if (fechaHasta) {
        queryBuilder.andWhere('p.fecha <= :fechaHasta', { fechaHasta });
      }

      const results = await queryBuilder.getRawMany();

      const items: DashboardTopPedidoDto[] = results.map((r) => ({
        pedidoId: r.pedidoId,
        numero: r.numero || 'Sin número',
        nombreCliente: r.nombreCliente || 'Sin cliente',
        fecha: r.fecha ? new Date(r.fecha) : new Date(),
        valorTotal: parseFloat(r.valorTotal) || 0,
      }));

      return { items };
    } catch (error) {
      this.logger.error(`Error al obtener top 10 pedidos: ${error}`);
      throw new HttpException(
        'Error al obtener los top 10 pedidos. Intenta de nuevo más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
