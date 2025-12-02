import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateReasonsRejectionDto } from './dto/create-reasons-rejection.dto';
import { UpdateReasonsRejectionDto } from './dto/update-reasons-rejection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RejectRepository } from 'src/rejects/repositories/rejects.repository';
import { ReasonRejectionRepository } from './repositories/reasons-rejection.repository';
import { ReasonsRejection } from './entities/reasons-rejection.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ReasonsRejectionService {
  private readonly logger = new Logger(ReasonsRejectionService.name);
  
  constructor(
    @InjectRepository(ReasonRejectionRepository)
    private readonly reasonRejectionRepository: ReasonRejectionRepository,
    @InjectRepository(RejectRepository)
    private readonly rejectRepository: RejectRepository,
    private readonly dataSource: DataSource,
  ) {

  }
  async create(createReasonsRejectionDto: CreateReasonsRejectionDto) {

    const { codigo, nombre } = createReasonsRejectionDto;

    const existingReason = await this.reasonRejectionRepository.findByCodeOrName(codigo, nombre);
    if (existingReason) {
      this.logger.warn(`El motivo de rechazo con codigo o nombre ya existente: ${createReasonsRejectionDto}`)
      throw new HttpException('El Motivo de rechazo con codigo o nombre ya existente', HttpStatus.BAD_REQUEST);
    }

    return this.reasonRejectionRepository.createReasonRejection({
      rejection_code: codigo,
      rejection: nombre,
      company_ERP_id: '', // Valor por defecto vacío para cumplir con la restricción NOT NULL
    });

  }

  async findAll() {
    return await this.reasonRejectionRepository.findAll();
  }

  async findOne(id: number): Promise<ReasonsRejection> {
    return await this.reasonRejectionRepository.findById(id);
  }

  async update(id: number, updateReasonsRejectionDto: UpdateReasonsRejectionDto) {
    const reason = await this.findOne(id);
    if (!reason) {
      this.logger.warn(`Motivo de rechazo con id: ${id} no encontrado`)
      throw new HttpException('Motivo de rechazo no encontrado.', HttpStatus.NOT_FOUND);
    }

    const { codigo, nombre } = updateReasonsRejectionDto;

    const existingReason = await this.reasonRejectionRepository.findByCodeOrName(codigo, nombre);
    if (existingReason && id != existingReason.id) {
      this.logger.warn(`El motivo de rechazo con codigo o nombre ya existente: ${updateReasonsRejectionDto}`)
      throw new HttpException('El Motivo de rechazo con codigo o nombre ya existente', HttpStatus.BAD_REQUEST);
    }

    return await this.dataSource.transaction(async (manager) => {
      try {
        const result = await this.reasonRejectionRepository.updateReason(reason, codigo, nombre);
        await this.rejectRepository.updateReasonsRejection(id, nombre);

        return { status: 'Success', data: result };
      } catch (error) {
        this.logger.error(`Ha ocurrido un erro al actualizar el motivo de rechazo(${updateReasonsRejectionDto}): ${error}`)
        throw new HttpException('Error al actualizar el motivo de rechazo.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }

  async remove(id: number) {
    const reason = await this.findOne(id);
    if (!reason) {
      this.logger.warn(`Motivo de rechazo con id: ${id} no encontrado`)
      throw new HttpException('Motivo de rechazo no encontrado.', HttpStatus.NOT_FOUND);
    }
    return this.reasonRejectionRepository.removeById(id);
  }
}
