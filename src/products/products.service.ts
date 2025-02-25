import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './repositories/products.repository';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,

  ) {

  }

  async findAll() {
    return await this.productRepository.findAll()
  }

  async findOne(id: number) {
    return await this.productRepository.findById(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new HttpException('Producto no encontrado.', HttpStatus.NOT_FOUND);
    }
    return this.productRepository.removeById(id);
  }

  async update(id: number,updateProductDto: UpdateProductDto) {

    
    const product = await this.findOne(id);
    if (!product) {
      throw new HttpException('Producto no encontrado.', HttpStatus.NOT_FOUND);
    }
    //TODO: MODIFICAR LOS VALORES DEL PRODUCTO
    const result = await this.productRepository.save(product)
    return { status: 'Success', data: result };

  }
}
