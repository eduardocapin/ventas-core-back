import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus, Req, Inject, Logger } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { CreateFilterDto } from './dto/create-filter.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Filtros')
@Controller('filters')
@ApiBearerAuth()
export class FiltersController {

  private readonly logger = new Logger(FiltersController.name);

  constructor(private readonly filtersService: FiltersService) { }


  @UseGuards(JwtAuthGuard)
  @Get('/roles')
  @ApiOperation({ summary: 'Obtener lista de roles' })
  @ApiResponse({ status: 200, description: 'Lista de roles obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getRoles() {
    this.logger.log('Se ha solicitado la carga del filtro de roles')
    try {
      return await this.filtersService.getRoles();
    } catch (error) {
      this.logger.error(`Ha ocurrido un error al obtener el filtro de roles: ${error}`)
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
  @Get('/permissions')
  @ApiOperation({ summary: 'Obtener lista de permisos' })
  @ApiResponse({ status: 200, description: 'Lista de permisos obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getPermissions() {
    this.logger.log('Se ha solicitado la carga del filtro de permisos')
    try {
      return await this.filtersService.getPermissions();
    } catch (error) {
      this.logger.error(`Ha ocurrido un error al obtener el filtro de permisos: ${error}`)
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
  @Get('config/:componentId')
  @ApiOperation({ summary: 'Obtener configuración de filtros por componentId' })
  @ApiParam({ name: 'componentId', description: 'ID del componente' })
  @ApiResponse({ status: 200, description: 'Configuración obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getFilterConfig(@Param('componentId') componentId: string) {
    try {
      this.logger.log(`Se ha solicitado la configuración de filtros para el componentId: ${componentId}`)
      // Llamar al servicio y pasar los datos validados
      return await this.filtersService.getFilterConfig(componentId);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al solicitar la configuración de filtros para el componentId(${componentId}): ${error}`)
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

  // IMPORTANTE: Esta ruta debe estar al final porque es genérica y capturaría otras rutas si estuviera antes
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


}
