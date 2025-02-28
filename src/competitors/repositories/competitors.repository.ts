import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Competitor } from "../entities/competitor.entity";
import { DataSource, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCompetitorDto } from "../dto/create-competitor.dto";

@Injectable()
export class CompetitorRepository extends Repository<Competitor> {

    constructor(@InjectRepository(Competitor) private readonly repo: Repository<Competitor>, private readonly dataSource: DataSource,) {
        super(repo.target, repo.manager, repo.queryRunner);
    }


    async findById(id: number): Promise<Competitor> {
        return await this.repo.findOne({ where: { id, deleted: false } });
    }

    async findByName(nombre: string): Promise<Competitor> {
        return await this.repo.findOne({
            where: [
                { name: nombre, deleted: false },
            ],
        });
    }



    async removeById(id: number): Promise<UpdateResult> {
        return await this.dataSource.transaction(async (manager) => {
            // Marcar el competidor como eliminado
            const result = await this.repo
                .createQueryBuilder()
                .update(Competitor)
                .set({ deleted: true })
                .where("id = :id", { id })
                .execute();

            // Marcar sus segmentaciones como eliminadas
            await manager
                .createQueryBuilder()
                .update("competitor_segmentations")
                .set({ deleted: true })
                .where("competitor_id = :id", { id })
                .execute();

            return result;
        });
    }

    async findAll() {
        const competitors = await this.repo.find({
            where: {
                deleted: false,
            },
        });

        if (!competitors.length) {
            throw new HttpException('No se encontraron Competidores', HttpStatus.NOT_FOUND);
        }

        return competitors;
    }

    async getFilter() {
        const competitors = await this.repo.find({
            where: [{
                deleted: false,
            },

            ],
            order: {
                name: 'ASC',
            },
        });
        if (!competitors.length) {
            throw new HttpException('No se encontraron Competidores', HttpStatus.NOT_FOUND);
        }

        return competitors;
    }

    async findAllWithSegmentations() {
        const competitors = await this.repo
            .createQueryBuilder("c")
            .leftJoin("competitor_segmentations", "cs", "c.id = cs.competitor_id")
            .leftJoin("product_segmentations", "s", "cs.product_segmentation_id = s.segmentation_value_id")
            .where("(c.deleted = false OR c.deleted IS NULL)")
            .andWhere("(cs.deleted = false OR cs.deleted IS NULL)")
            .select([
                "c.id",
                "c.name",
                "COALESCE(GROUP_CONCAT(s.segmentation_value_id), '-1') AS segmentation_value_ids",
            ])
            .groupBy("c.id, c.name")
            .orderBy("c.name", "ASC")
            .getRawMany();

        if (!competitors.length) {
            throw new HttpException('No se encontraron Competidores', HttpStatus.NOT_FOUND);
        }

        return competitors;
    }

    async findCompetitorsByFamily(familyId: number) {
        const competitors = await this.repo
            .createQueryBuilder("c")
            .innerJoin("competitor_segmentations", "cs", "c.id = cs.competitor_id")
            .where("(c.deleted = false OR c.deleted IS NULL)")
            .andWhere("(cs.deleted = false OR cs.deleted IS NULL)")
            .andWhere("cs.product_segmentation_id IN (:...ids)", { ids: [-1, familyId] })
            .select(["c.id", "c.name"])
            .orderBy("c.name", "ASC")
            .getMany();

        if (!competitors.length) {
            throw new HttpException("No se encontraron Competidores para la familia indicada", HttpStatus.NOT_FOUND);
        }

        return competitors;
    }

    async findCompetitorById(id: number) {
        const competitor = await this.repo
            .createQueryBuilder("c")
            .leftJoin("competitor_segmentations", "cs", "c.id = cs.competitor_id")
            .leftJoin("product_segmentations", "s", "cs.product_segmentation_id = s.segmentation_value_id")
            .where("c.id = :id", { id })
            .andWhere("(c.deleted = false OR c.deleted IS NULL)")
            .andWhere("(cs.deleted = false OR cs.deleted IS NULL)")
            .select([
                "c.id",
                "c.name",
                "COALESCE(GROUP_CONCAT(s.segmentation_value_id), -1) AS segmentation_value_ids"
            ])
            .groupBy("c.id, c.name")
            .getRawOne();
        return competitor;
    }

    async createCompetitor(competitorData: CreateCompetitorDto) {
        const { nombre, product_segmentation_ids } = competitorData
        return await this.dataSource.transaction(async (manager) => {
            // Insertar el competidor
            const { identifiers } = await this.repo
                .createQueryBuilder()
                .insert()
                .into(Competitor)
                .values({ name: nombre })
                .execute();

            const competitorId = identifiers[0].id;

            // Insertar segmentaciones si existen
            if (product_segmentation_ids.length > 0) {
                await manager
                    .createQueryBuilder()
                    .insert()
                    .into("competitor_segmentations")
                    .values(
                        product_segmentation_ids.map((segmentationId) => ({
                            competitor_id: competitorId,
                            product_segmentation_id: segmentationId,
                        }))
                    )
                    .execute();
            }

            return {
                competitor_id: competitorId,
                product_segmentation_ids: product_segmentation_ids || [],
                message: product_segmentation_ids?.length ? 'Competidor creado con segmentaciones.' : 'Competidor creado sin segmentaciones.',
            };
        });
    }

    async updateComepetitor(competitor: Competitor, nombre: string) {
        const newValue = {
            name: nombre,
        }
        const updatedCompetitor = { ...competitor, newValue };

        return await this.repo.save(updatedCompetitor);
    }

    async updateCompetitorSegmentations(id: number, productSegmentationIds: number[]) {

        return await this.dataSource.transaction(async (manager) => {
            // Marcar como eliminadas las segmentaciones actuales
            await manager
                .createQueryBuilder()
                .update("competitor_segmentations")
                .set({ deleted: true })
                .where("competitor_id = :id", { id })
                .andWhere("deleted = false")
                .execute();

            if (productSegmentationIds.length > 0) {
                // Insertar nuevas relaciones o restaurar las existentes
                return await manager
                    .createQueryBuilder()
                    .insert()
                    .into("competitor_segmentations")
                    .values(
                        productSegmentationIds.map((segmentationId) => ({
                            competitor_id: id,
                            product_segmentation_id: segmentationId,
                            deleted: false,
                        }))
                    )
                    .orUpdate(["deleted"], ["competitor_id", "product_segmentation_id"])
                    .execute();
            }

        });
    }

}
