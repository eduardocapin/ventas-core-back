import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClientSegmentation } from "../entities/client-segmentation.entity";


@Injectable()
export class ClientSegmentationRepository extends Repository<ClientSegmentation> {

    private readonly logger = new Logger(ClientSegmentationRepository.name);
    constructor(@InjectRepository(ClientSegmentation) private readonly repo: Repository<ClientSegmentation>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getFilter(n: number) {
        const segmentations = await this.find({
            where: [
                { deleted: false, segmentation_number: n },

            ],
            order: {
                segmentation_value: 'ASC',
            },
            select: ['segmentation_value_id', 'segmentation_value',],
        });

        if (!segmentations.length) {
            this.logger.warn(`No se encontraron valores para la segmentacion de cliente: ${n}`)
            throw new HttpException('No se encontraron segmentaciones.', HttpStatus.NOT_FOUND);
        }

        return segmentations.map((segmentation) => ({
            id: segmentation.segmentation_value_id,
            name: segmentation.segmentation_value,
        }));
    }


}