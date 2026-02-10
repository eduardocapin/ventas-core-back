import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedido.entity';

/** Nombres reales de columnas en [dbo].[Pedidos] para ORDER BY y WHERE (evitar "Invalid column name"). */
const PEDIDOS_COLUMNS: Record<string, string> = {
  id: 'Id_Pedido',
  tipoDocumento: 'TipoDocumento',
  numero: 'Referencia_Pedido',
  codigoPedido: 'Referencia_Pedido',
  codigoDocumento: 'Referencia_Pedido',
  tipoPedido: 'TipoDocumento',
  cliente: 'Cliente_N_Comercial',
  nombreCliente: 'Cliente_N_Comercial',
  agente: 'Agente_Nombre',
  nombreAgente: 'Agente_Nombre',
  fecha: 'Fecha_Pedido',
  fechaDocumento: 'Fecha_Pedido',
  delegacion: 'AgenciaE',
  origen: 'AgenciaE',
  estadoIntegracion: 'EstadoImportacion',
  estadoImportacion: 'EstadoImportacion',
  deleted: 'BajaEnERP',
};

/** Mapeo sortColumn (DTO/UI) → propiedad de entidad para orderBy */
const SORT_COLUMN_TO_ENTITY_PROP: Record<string, string> = {
  codigoPedido: 'numero',
  codigoDocumento: 'numero',
  tipoPedido: 'tipoDocumento',
  tipoDocumento: 'tipoDocumento',
  fechaDocumento: 'fecha',
  nombreCliente: 'cliente',
  nombreAgente: 'agente',
  agente: 'agente',
  origen: 'delegacion',
  estadoImportacion: 'estadoIntegracion',
};

export interface FindPaginatedOptions {
  currentPage: number;
  itemsPerPage: number;
  searchTerm?: string;
  selectedFilters?: any[];
  sortColumn?: string;
  sortDirection?: string;
}

@Injectable()
export class PedidoRepository {
  private readonly repo: Repository<Pedido>;

  constructor(@InjectRepository(Pedido) repository: Repository<Pedido>) {
    this.repo = repository;
  }

  async findPaginated(options: FindPaginatedOptions): Promise<[Pedido[], number]> {
    const {
      currentPage,
      itemsPerPage,
      searchTerm = '',
      sortColumn = 'id',
      sortDirection = 'ASC',
    } = options;

    const whereParams: Record<string, unknown> = { falseVal: false };
    if (searchTerm && searchTerm.trim()) {
      whereParams.term = `%${searchTerm.trim()}%`;
    }

    const countQb = this.repo
      .createQueryBuilder('p')
      .where(`(p.${PEDIDOS_COLUMNS.deleted} = :falseVal OR p.${PEDIDOS_COLUMNS.deleted} IS NULL)`)
      .setParameters(whereParams);
    if (searchTerm && searchTerm.trim()) {
      countQb.andWhere(
        `(p.${PEDIDOS_COLUMNS.tipoDocumento} LIKE :term OR p.${PEDIDOS_COLUMNS.numero} LIKE :term OR p.${PEDIDOS_COLUMNS.cliente} LIKE :term OR p.${PEDIDOS_COLUMNS.agente} LIKE :term OR p.${PEDIDOS_COLUMNS.delegacion} LIKE :term)`,
      );
    }

    // Evitar bug TypeORM #8213 (databaseName undefined): paginación sin joins, luego cargar entidades con relaciones
    const sortProp = (sortColumn && PEDIDOS_COLUMNS[sortColumn]) ? sortColumn : 'id';
    const orderByProp = SORT_COLUMN_TO_ENTITY_PROP[sortProp] ?? sortProp;
    const order = (sortDirection && sortDirection.toUpperCase() === 'DESC') ? 'DESC' : 'ASC';
    const skip = (currentPage - 1) * itemsPerPage;

    const idsQb = this.repo
      .createQueryBuilder('p')
      .select('p.id', 'pedidoId')
      .where(`(p.${PEDIDOS_COLUMNS.deleted} = :falseVal OR p.${PEDIDOS_COLUMNS.deleted} IS NULL)`)
      .setParameters(whereParams)
      .orderBy(`p.${orderByProp}`, order as 'ASC' | 'DESC')
      .take(itemsPerPage)
      .skip(skip);
    if (searchTerm && searchTerm.trim()) {
      idsQb.andWhere(
        `(p.${PEDIDOS_COLUMNS.tipoDocumento} LIKE :term OR p.${PEDIDOS_COLUMNS.numero} LIKE :term OR p.${PEDIDOS_COLUMNS.cliente} LIKE :term OR p.${PEDIDOS_COLUMNS.agente} LIKE :term OR p.${PEDIDOS_COLUMNS.delegacion} LIKE :term)`,
      );
    }

    const [idRows, totalItems] = await Promise.all([idsQb.getRawMany<{ pedidoId: number }>(), countQb.getCount()]);
    const ids = idRows.map((r) => r.pedidoId);
    if (ids.length === 0) {
      return [[], totalItems];
    }

    const pedidos = await this.repo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.clienteRelation', 'cliente')
      .leftJoinAndSelect('p.totales', 'totales')
      .where('p.id IN (:...ids)', { ids })
      .getMany();

    // Restaurar orden según la lista de ids
    const orderMap = new Map(ids.map((id, i) => [id, i]));
    pedidos.sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0));
    return [pedidos, totalItems];
  }

  async findByIdWithLineas(id: number): Promise<Pedido | null> {
    return this.repo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.lineas', 'lineas')
      .leftJoinAndSelect('p.totales', 'totales')
      .leftJoinAndSelect('p.clienteRelation', 'cliente')
      .leftJoinAndSelect('p.customerRelation', 'customer')
      .where('p.Id_Pedido = :id', { id })
      .getOne();
  }
}
