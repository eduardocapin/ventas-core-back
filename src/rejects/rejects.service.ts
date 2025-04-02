import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRejectDto } from './dto/create-reject.dto';
import { UpdateRejectDto } from './dto/update-reject.dto';
import { UpdateRejectCorrectiveActionDto } from './dto/update-reject-corrective-action.dto';
import { PaginatedRejectsDto } from './dto/paginated-reject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RejectRepository } from './repositories/rejects.repository';
import { Rejection } from './entities/reject.entity';
import { KPIsRejectsDto } from './dto/kpis-rejects.dto';
import { ClientRepository } from 'src/clients/repositories/clients.repository';
import { FilterDto } from 'src/filters/dto/filter.dto';

@Injectable()
export class RejectsService {
  constructor(
    @InjectRepository(RejectRepository)
    private readonly rejectRepository: RejectRepository,
    @InjectRepository(ClientRepository)
    private readonly clientRepository: ClientRepository) {

  }
  async updateCorrectiveAction(id: number, updateRejectCorrectiveActionDto: UpdateRejectCorrectiveActionDto) {
    const rejection = await this.findOne(id);
    if (!rejection) {
      throw new HttpException('Rechazo no encontrado.', HttpStatus.NOT_FOUND);
    }

    const updatedRejection = { ...rejection, ...updateRejectCorrectiveActionDto };

    const result = await this.rejectRepository.save(updatedRejection);

    return { status: 'Success', data: result };
  }

  async findAll(paginatedRejectsDto: PaginatedRejectsDto): Promise<{ items: Rejection[]; totalItems: number }> {
    return await this.rejectRepository.findAll(paginatedRejectsDto);
  }

  async KPIs(KPIsRejectsDto: KPIsRejectsDto) {
    return await this.rejectRepository.getRejectionKPIs(KPIsRejectsDto)
  }

  async findOne(id: number): Promise<Rejection> {
    return await this.rejectRepository.findById(id);
  }

  async update(id: number, updateRejectDto: UpdateRejectDto) {
    const rejection = await this.findOne(id);
    if (!rejection) {
      throw new HttpException('Rechazo no encontrado.', HttpStatus.NOT_FOUND);
    }
    const updatedRejection = { ...rejection, ...updateRejectDto };

    const result = await this.rejectRepository.save(updatedRejection);

    return { status: 'Success', data: result };
  }

  async remove(id: number) {
    const rejection = await this.findOne(id);
    if (!rejection) {
      throw new HttpException('Rechazo no encontrado.', HttpStatus.NOT_FOUND);
    }
    return this.rejectRepository.removeById(id);
  }

  async getRejectionGroupByReasons(selectedFilters: FilterDto[]) {
    return await this.rejectRepository.getRejectionGroupByReasons(selectedFilters)
  }

  async getRejectionGroupByFamily(selectedFilters: FilterDto[], topN: number) {
    const rejectionGroupByFamily = await this.rejectRepository.getRejectionGroupByFamily(selectedFilters, topN)
    // Filtrar valores nulos y convertir la estructura
    const categorias = rejectionGroupByFamily
      .filter(item => item.name != null) // Elimina los valores nulos
      .map(item => item.name);

    const valores = rejectionGroupByFamily
      .filter(item => item.name != null)
      .map(item => item.value);

    return { categorias, valores };
  }

  async getRejectionGroupByProduct(selectedFilters: FilterDto[], topN: number) {

    const rejectionGroupByProduct = await this.rejectRepository.getRejectionGroupByProduct(selectedFilters, topN)
    // Filtrar valores nulos y convertir la estructura
    const categorias = rejectionGroupByProduct
      .filter(item => item.name != null) // Elimina los valores nulos
      .map(item => item.name);

    const valores = rejectionGroupByProduct
      .filter(item => item.name != null)
      .map(item => item.value);

    return { categorias, valores };
  }

  async getRejectionGroupByCustomerSegmentation(selectedFilters: FilterDto[], n: number) {
    const rawData = await this.rejectRepository.getRejectionGroupByCustomerSegmentation(selectedFilters, n);

    const categorias = rawData
      .filter(item => item.segmentation_value != null)
      .map(item => item.segmentation_value);

    const valores = rawData
      .filter(item => item.segmentation_value != null)
      .map(item => item.value);

    const titulo = rawData.length > 0 && rawData[0].title != null ? rawData[0].title : `Segmentación ${n}`;

    return { titulo, categorias, valores };
  }

  async getRejectionGroupByMonth(selectedFilters: FilterDto[]) {
    const rawData = await this.rejectRepository.getRejectionGroupByMonth(selectedFilters);

    const mesesMap = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];

    // Inicializar estructura con 0 en todos los meses
    const valores = Array(12).fill(0);

    // Rellenar con los valores obtenidos
    rawData.forEach(({ name, value }) => {
      if (name >= 1 && name <= 12) {
        valores[name - 1] = value;
      }
    });

    return { categorias: mesesMap, valores };
  }


  async getRejectionGroupByDayOfWeek(selectedFilters: FilterDto[]) {

    const rawData = await this.rejectRepository.getRejectionGroupByDayOfWeek(selectedFilters);
    const diasMap = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const valores = Array(7).fill(0);

    rawData.forEach(({ name, value }) => {
      // Ajustamos el índice para que el lunes sea el primer día (name 2 -> índice 0)
      // SQL Server: 1 (Domingo) -> 6, 2 (Lunes) -> 0, 3 (Martes) -> 1, ..., 7 (Sábado) -> 5
      const adjustedIndex = (name % 7) === 1 ? 6 : name - 2;
      valores[adjustedIndex] = value;
    });

    return { categorias: diasMap, valores };
  }

  async getClientsWithRejections(selectedFilters: FilterDto[]) {
    const clientsWithRejections = await this.rejectRepository.getClientsWithRejections(selectedFilters)
    const totalClients = await this.clientRepository.getCount(selectedFilters)
    return [{ value: clientsWithRejections, name: 'Con rechazos' }, { value: totalClients - clientsWithRejections, name: 'Sin rechazos' }]
  }

  private processRejectionSummary(
    summary: { name: string, rejection_reason: string, rejection_count: number }[]
  ) {
    const summaryMap = new Map<string, { nombre: string; total: number; rechazos: Record<string, number> }>();

    summary.forEach(({ name, rejection_reason, rejection_count }) => {
      if (!name) return; // Ignorar registros con nombre null o undefined

      if (!summaryMap.has(name)) {
        summaryMap.set(name, { nombre: name, total: 0, rechazos: {} });
      }
      const data = summaryMap.get(name)!;
      data.total += Number(rejection_count);
      data.rechazos[rejection_reason] = Number(rejection_count);
    });

    // Filtrar los rechazos con cantidad 0
    summaryMap.forEach((data) => {
      Object.keys(data.rechazos).forEach((reason) => {
        if (data.rechazos[reason] === 0) {
          delete data.rechazos[reason];
        }
      });
    });

    return Array.from(summaryMap.values());
  }

  async getRejectionsSummaryGroupByCustomer(selectedFilters: FilterDto[]) {
    const summary = await this.rejectRepository.getRejectionsSummaryGroupByCustomer(selectedFilters)
    return this.processRejectionSummary(summary)
  }

  async getRejectionsSummaryGroupByCity(selectedFilters: FilterDto[]) {
    const summary = await this.rejectRepository.getRejectionsSummaryGroupByCity(selectedFilters)
    return this.processRejectionSummary(summary)
  }

  async getRejectionsSummaryGroupByFamily(selectedFilters: FilterDto[]) {
    const summary = await this.rejectRepository.getRejectionsSummaryGroupByFamily(selectedFilters)
    return this.processRejectionSummary(summary)
  }

  async getRejectionsSummaryGroupByProvince(selectedFilters: FilterDto[]) {
    const summary = await this.rejectRepository.getRejectionsSummaryGroupByProvince(selectedFilters)
    return this.processRejectionSummary(summary)
  }

  async getRejectionsSummaryGroupBySalesman(selectedFilters: FilterDto[]) {
    const summary = await this.rejectRepository.getRejectionsSummaryGroupBySalesman(selectedFilters)
    return this.processRejectionSummary(summary)
  }

  async getRejectionsSummaryGroupByCustomerSegmentation(selectedFilters: FilterDto[], n: number) {
    const summary = await this.rejectRepository.getRejectionsSummaryGroupByCustomerSegmentation(selectedFilters, n);

    // Procesar los datos usando processRejectionSummary
    const processedSummary = this.processRejectionSummary(summary);

    // Obtener el nombre de la segmentación (suponiendo que es la misma para todos los datos)
    const nombreSegmentacion = processedSummary.length > 0 && summary[0]?.title ? summary[0].title : 'Desconocido';

    return {
        nombre_segmentacion: nombreSegmentacion,
        valores: processedSummary
    };
  }
}

