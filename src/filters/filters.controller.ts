import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus, Req, Inject, Logger } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { CreateFilterDto } from './dto/create-filter.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Filtros')
@Controller('filters')
@ApiBearerAuth()
export class FiltersController {

  private readonly logger = new Logger(FiltersController.name);

  constructor(private readonly filtersService: FiltersService) { }


  @UseGuards(JwtAuthGuard)
  @Get('/cities')
  @ApiOperation({ summary: 'Obtener lista de poblaciones' })
  @ApiResponse({ status: 200, description: 'Lista de poblaciones obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getCities() {
    this.logger.log('Se ha solicitado la carga del filtro de poblaciones')
    try {
      // Llamar al servicio y pasar los datos validados
      return await this.filtersService.getCities();
    } catch (error) {
      this.logger.error(`Ha ocurrido un error al obtener el filtro de poblaciones: ${error}`)
      console.log(error);
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
  @Get('/provinces')
  @ApiOperation({ summary: 'Obtener lista de provincias' })
  @ApiResponse({ status: 200, description: 'Lista de provincias obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  getProvinces() {
    try {
      this.logger.log(`Se ha solicitado la carga del filtro de provincias`)
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getProvinces();
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error en la carga del filtro de provincias: ${error}`)
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
  @Get('/status')
  @ApiOperation({ summary: 'Obtener lista de estados' })
  @ApiResponse({ status: 200, description: 'Lista de estados obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getStatus() {
    try {
      this.logger.log('Se ha solicitado al carga del filtro Estados')
      // Llamar al servicio y pasar los datos validados
      return await this.filtersService.getStatus();
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error en la carga del filtro de Estados: ${error}`)
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
  @Get('/symbol')
  @ApiOperation({ summary: 'Obtener lista de símbolos' })
  @ApiResponse({ status: 200, description: 'Lista de símbolos obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getSymbol() {
    try {
      this.logger.log('Se ha solicitado la lista de simbolos')
      // Llamar al servicio y pasar los datos validados
      return await this.filtersService.getSymbol();
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al obtener la lista de simbolos: ${error}`)
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
  @Get('/reasons-rejection')
  @ApiOperation({ summary: 'Obtener lista de motivos de rechazo' })
  @ApiResponse({ status: 200, description: 'Lista de motivos de rechazo obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getReasonsRejection() {
    try {
      this.logger.log('Se ha solicitado la carga del filtro de motivos de rechazo')
      // Llamar al servicio y pasar los datos validados
      return await this.filtersService.getReasonsRejection();
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error en la carga del filtro de motivos de rechazo: ${error}`)
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
  @Get('/competitors')
  @ApiOperation({ summary: 'Obtener lista de competidores' })
  @ApiResponse({ status: 200, description: 'Lista de competidores obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getCompetitors() {
    try {
      this.logger.log('Se ha solicitado la carga del filtro de competidores')
      // Llamar al servicio y pasar los datos validados
      return await this.filtersService.getCompetitors();
    } catch (error) {
      this.logger.error(`Ha ocurrido un error durante la carga del filtro de competidores: ${error}`)
      console.log(error);
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
  @Get('/salesmen')
  @ApiOperation({ summary: 'Obtener lista de vendedores' })
  @ApiResponse({ status: 200, description: 'Lista de vendedores obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getSalesmen() {
    try {
      this.logger.log('Se ha solictado la carga del filtro de vendedores')
      // Llamar al servicio y pasar los datos validados
      return await this.filtersService.getSalesmen();
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la carga del filtro de vendedores: ${error}`)
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
  @Get(':componentId')
  @ApiOperation({ summary: 'Obtener filtros por componentId' })
  @ApiParam({ name: 'componentId', description: 'ID del componente' })
  @ApiResponse({ status: 200, description: 'Filtros obtenidos correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findFiltersByComponetId(@Param('componentId') componentId: string) {
    try {
      // Llamar al servicio y pasar los datos validados
      this.logger.log(`Se ha solicitado la lista de filtros para el componentId: ${componentId}`)
      return await this.filtersService.findFiltersByComponetId(componentId);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al solicitar la lista de filtros para el componentId(${componentId}): ${error}`)
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
  @Get('segmentation/:n')
  @ApiOperation({ summary: 'Obtener segmentación de clientes por el número de segmentación' })
  @ApiParam({ name: 'n', description: 'Número de segmentación', type: Number })
  @ApiResponse({ status: 200, description: 'Segmentación de clientes obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getSegmentation(@Param('n', ParseIntPipe) n: number) {
    try {
      this.logger.log(`Se ha solicitado la carga del filtro de segmentacion de cliente: ${n}`)
      // Llamar al servicio y pasar los datos validados
      return await this.filtersService.getSegmentation(n);
    } catch (error) {
      this.logger.error(`Ha ocurrido un error durante  la carga del filtro de segmentacion de cliente(${n}): ${error}`)
      console.log(error);
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
  @Get('product-segmentation/:n')
  @ApiOperation({ summary: 'Obtener segmentación de productos por número de segmentación' })
  @ApiParam({ name: 'n', description: 'Número de segmentación', type: Number })
  @ApiResponse({ status: 200, description: 'Segmentación de productos obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getProductSegmentation(@Param('n', ParseIntPipe) n: number) {
    try {
      this.logger.log(`Se ha solicitado la carga del filtro de segmentacion de productos: ${n}`)
      // Llamar al servicio y pasar los datos validados
      return await this.filtersService.getProductSegmentation(n);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la carga del filtro de segmentacion de producto(${n}): ${error}`)
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
  @Get('saved/:componentId')
  @ApiOperation({ summary: 'Obtener filtros guardados por componentId' })
  @ApiParam({ name: 'componentId', description: 'ID del componente' })
  @ApiResponse({ status: 200, description: 'Filtros guardados obtenidos correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getSavedByComponetId(@Req() req, @Param('componentId') componentId: string) {
    try {
      this.logger.log(`Se ha solicitado la lista de filtros guardados para el componentId: ${componentId}`)
      // Llamar al servicio y pasar los datos validados
      const email = req.user['email']; // Se obtiene el email desde el token
      return await this.filtersService.getSavedByComponetId(componentId, email);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al solicitar la lista de filtros guardados para el componentId(${componentId}): ${error}`)
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
  @Post('saved/:componentId')
  @ApiOperation({ summary: 'Crear filtros guardados por componentId' })
  @ApiParam({ name: 'componentId', description: 'ID del componente' })
  @ApiBody({ type: CreateFilterDto })
  @ApiResponse({ status: 201, description: 'Filtro guardado correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async createSavedByComponetId(@Req() req, @Param('componentId') componentId: string, @Body() createFilterDto: CreateFilterDto) {
    try {
      this.logger.log(`Se ha solicitado la creacion de un filtro guardado para el compoenntId: ${componentId}`)
      this.logger.debug(createFilterDto)
      // Llamar al servicio y pasar los datos validados
      const email = req.user['email']; // Se obtiene el email desde el token
      return await this.filtersService.createSavedByComponetId(componentId, email, createFilterDto);
    } catch (error) {
      this.logger.error(`Ha ocurrido un error durante la creacion de un filrto fuardado para el componentId(${componentId}): ${error}`)
      console.log(error);
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
  @Delete('saved/:id')
  @ApiOperation({ summary: 'Eliminar filtro guardado' })
  @ApiParam({ name: 'id', description: 'ID del filtro guardado' })
  @ApiResponse({ status: 200, description: 'Filtro eliminado correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async removeSaved(@Param('id', ParseIntPipe) id: number) {
    try {
      this.logger.log(`Se ha solicitado la eliminación del filtro guardado con id: ${id}`)
      // Llamar al servicio y pasar los datos validados
      return await this.filtersService.removeSaved(id);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la eliminación del filtro guardado(${id}): ${error}`)
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
