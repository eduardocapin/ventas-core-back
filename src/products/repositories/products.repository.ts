import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository, UpdateResult } from "typeorm";
import { Product } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductRepository extends Repository<Product> {


    constructor(@InjectRepository(Product) private readonly repo: Repository<Product>, @Inject('LOGGER') private readonly logger) {
        super(repo.target, repo.manager, repo.queryRunner);
    }


    async findAll(): Promise<Product[]> {
        const products = await this.repo.find({
            where: {
                deleted: false,
            },
        });

        if (!products.length) {
            this.logger.warn(`No se econtraron productos`)
            throw new HttpException('No se encontraron productos.', HttpStatus.NOT_FOUND);
        }
        return products;
    }

    async removeById(id: number): Promise<UpdateResult> {
        return await this.repo.update(id, { deleted: true });
    }

    async findById(id: number): Promise<Product> {
        return this.repo.findOne({ where: { id, deleted: false } });
    }

    async creaProduct(productData: Partial<Product>): Promise<Product> {
        const product = this.create(productData);
        return this.save(product);
    }
}