import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './repositories/products.repository';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSegmentationRepository } from './repositories/product-segmentation.repository';
import { ProductSegmentation } from './entities/product-segmentation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductRepository, ProductSegmentation, ProductSegmentationRepository]),],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository, ProductSegmentationRepository],
  exports:[ProductSegmentationRepository]
})
export class ProductsModule { }
