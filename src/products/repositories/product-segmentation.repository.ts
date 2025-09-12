import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductSegmentation } from "../entities/product-segmentation.entity";



@Injectable()
export class ProductSegmentationRepository extends Repository<ProductSegmentation> {

    private readonly logger = new Logger(ProductSegmentationRepository.name);

    constructor(@InjectRepository(ProductSegmentation) private readonly repo: Repository<ProductSegmentation>) {
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
            this.logger.warn(`No se econtraron valores para la segmentacion de producto: ${n}`)
            throw new HttpException('No se encontraron segmentaciones.', HttpStatus.NOT_FOUND);
        }

        return segmentations.map((segmentation) => ({
            id: segmentation.segmentation_value_id,
            name: segmentation.segmentation_value,
        }));
    }


}