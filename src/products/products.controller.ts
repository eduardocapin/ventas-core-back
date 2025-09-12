import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe, Inject, Logger } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('products')
@ApiBearerAuth()
export class ProductsController {

  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error al obtener los productos.' })
  async findAll() {
    try {
      this.logger.log(`Se ha solicitado la lista de productos`)
      // Llamar al servicio y pasar los datos validados
      return await this.productsService.findAll();
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la solicutd de la lista de productos: ${error}`)
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto obtenido correctamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error al obtener el producto.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      this.logger.log(`Se ha solicitado el producto con id: ${id}`)
      // Llamar al servicio y pasar los datos validados
      return await this.productsService.findOne(+id);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la obtencion del producto (${id}): ${error}`)
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error al actualizar el producto.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    try {
      this.logger.log(`Actualizacion del producto con id: ${id}`)
      // Llamar al servicio y pasar los datos validados
      return await this.productsService.update(+id, updateProductDto);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la actualizacion del producto (${id}): ${error}`)
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error al eliminar el producto.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      this.logger.log(`Solicitud de eliminacion del producto con id: ${id}`)
      // Llamar al servicio y pasar los datos validados
      return await this.productsService.remove(+id);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la eliminacion del producto(${id}): ${error}`)
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }
}
