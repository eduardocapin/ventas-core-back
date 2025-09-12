import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { ReasonsRejection } from "../entities/reasons-rejection.entity";

@Injectable()
export class ReasonRejectionRepository extends Repository<ReasonsRejection> {

    private readonly logger = new Logger(ReasonRejectionRepository.name);

    constructor(@InjectRepository(ReasonsRejection) private readonly repo: Repository<ReasonsRejection>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }


    async findById(id: number): Promise<ReasonsRejection> {
        return await this.repo.findOne({ where: { id, deleted: false } });
    }

    async findByCodeOrName(codigo: string, nombre: string): Promise<ReasonsRejection> {
        return await this.repo.findOne({
            where: [
                { rejection_code: codigo, deleted: false },
                { rejection: nombre, deleted: false }
            ],
        });
    }

    async removeById(id: number): Promise<UpdateResult> {
        return await this.repo.update(id, { deleted: true });
    }

    async findAll() {
        const reasons = await this.repo.find({
            where: {
                deleted: false,
            },
        });

        if (!reasons.length) {
            this.logger.warn('No se encontraron Motivos de rechazo')
            throw new HttpException('No se encontraron Motivos de rechazo.', HttpStatus.NOT_FOUND);
        }

        return reasons.map((reason) => ({
            ...reason,
            name: reason.rejection,
        }));;
    }

    createReasonRejection(reasonData: Partial<ReasonsRejection>) {
        const reason = this.create(reasonData);
        return this.save(reason);
    }

    async updateReason(reason: ReasonsRejection, codigo: string, nombre: string) {
        reason.rejection_code = codigo;
        reason.rejection = nombre;

        return await this.repo.save(reason);
    }

    async getFilter() {
        const reasons = await this.find({
            where: [
                { deleted: false },

            ],
            order: {
                rejection: 'ASC',
            },
            select: ['id', 'rejection_code', 'rejection'],
        });

        if (!reasons.length) {
            this.logger.warn('No se econtraron motivos de rechazo')
            throw new HttpException('No se encontraron Motivos de rechazo.', HttpStatus.NOT_FOUND);
        }

        return reasons.map((reason) => ({
            id: reason.id,
            rejection_code: reason.rejection_code,
            name: reason.rejection,
        }));

    }
}
