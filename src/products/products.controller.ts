import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('products')
@ApiBearerAuth() 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente.' })
  @ApiResponse({ status: 500, description: 'Error al crear el producto.' })
  create(@Body() createProductDto: CreateProductDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.productsService.create(createProductDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error al obtener los productos.' })
  findAll() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.productsService.findAll();
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.productsService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.productsService.update(+id, updateProductDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
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
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.productsService.remove(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    
  }
}
