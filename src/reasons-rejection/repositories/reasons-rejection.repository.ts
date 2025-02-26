import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { ReasonsRejection } from "../entities/reasons-rejection.entity";

@Injectable()
export class ReasonRejectionRepository extends Repository<ReasonsRejection> {

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
        return await this.repo.update(id, { deleted: false });
    }

    async findAll() {
        const reasons = await this.repo.find({
            where: {
                deleted: false,
            },
        });

        if (!reasons.length) {
            throw new HttpException('No se encontraron Motivos de rechazo.', HttpStatus.NOT_FOUND);
        }

        return reasons;
    }

    createReasonRejection(reasonData: Partial<ReasonsRejection>) {
        const reason = this.create(reasonData);
        return this.save(reason);
    }

    async updateReason(reason: ReasonsRejection, codigo: string, nombre: string) {
        const newValue ={
            rejection_code: codigo,
            rejection: nombre,
          }
          const updatedReason = { ...reason, newValue };
      
         return await this.repo.save(updatedReason);
      }
}
