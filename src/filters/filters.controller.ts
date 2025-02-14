import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus, Req } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { CreateFilterDto } from './dto/create-filter.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Filtros')
@Controller('filters')
@ApiBearerAuth() 
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) { }


  @UseGuards(JwtAuthGuard)
  @Get('/cities')
  @ApiOperation({ summary: 'Obtener lista de poblaciones' })
  @ApiResponse({ status: 200, description: 'Lista de poblaciones obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  getCities() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getCities();
    } catch (error) {
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
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getProvinces();
    } catch (error) {
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
  @Get('/status')
  @ApiOperation({ summary: 'Obtener lista de estados' })
  @ApiResponse({ status: 200, description: 'Lista de estados obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  getStatus() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getStatus();
    } catch (error) {
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
  @Get('/symbol')
  @ApiOperation({ summary: 'Obtener lista de símbolos' })
  @ApiResponse({ status: 200, description: 'Lista de símbolos obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  getSymbol() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getSymbol();
    } catch (error) {
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
  @Get('/reasons-rejection')
  @ApiOperation({ summary: 'Obtener lista de motivos de rechazo' })
  @ApiResponse({ status: 200, description: 'Lista de motivos de rechazo obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  getReasonsRejection() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getReasonsRejection();
    } catch (error) {
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
  @Get('/competitors')
  @ApiOperation({ summary: 'Obtener lista de competidores' })
  @ApiResponse({ status: 200, description: 'Lista de competidores obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  getCompetitors() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getCompetitors();
    } catch (error) {
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
  getSalesmen() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getSalesmen();
    } catch (error) {
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
  @Get(':componentId')
  @ApiOperation({ summary: 'Obtener filtros por componentId' })
  @ApiParam({ name: 'componentId', description: 'ID del componente' })
  @ApiResponse({ status: 200, description: 'Filtros obtenidos correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  findFiltersByComponetId(@Param('componentId') componentId: string) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.findFiltersByComponetId(componentId);
    } catch (error) {
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
  @Get('segmentation/:n')
  @ApiOperation({ summary: 'Obtener segmentación de clientes por el número de segmentación' })
  @ApiParam({ name: 'n', description: 'Número de segmentación' })
  @ApiResponse({ status: 200, description: 'Segmentación de clientes obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  getSegmentation(@Param('n') n: string) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getSegmentation(n);
    } catch (error) {
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
  @ApiParam({ name: 'n', description: 'Número de segmentación' })
  @ApiResponse({ status: 200, description: 'Segmentación de productos obtenida correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  getProductSegmentation(@Param('n') n: string) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getProductSegmentation(n);
    } catch (error) {
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
  @Get('saved/:componentId')
  @ApiOperation({ summary: 'Obtener filtros guardados por componentId' })
  @ApiParam({ name: 'componentId', description: 'ID del componente' })
  @ApiResponse({ status: 200, description: 'Filtros guardados obtenidos correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  getSavedByComponetId(@Req() req,@Param('componentId') componentId: string) {
    try {
      // Llamar al servicio y pasar los datos validados
      const email = req.user['email']; // Se obtiene el email desde el token
      return this.filtersService.getSavedByComponetId(componentId, email);
    } catch (error) {
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
  @Post('saved/:componentId')
  @ApiOperation({ summary: 'Crear filtros guardados por componentId' })
  @ApiParam({ name: 'componentId', description: 'ID del componente' })
  @ApiBody({ type: CreateFilterDto })
  @ApiResponse({ status: 201, description: 'Filtro guardado correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  createSavedByComponetId(@Req() req,@Param('componentId') componentId: string, @Body() createFilterDto: CreateFilterDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      const email = req.user['email']; // Se obtiene el email desde el token
      return this.filtersService.createSavedByComponetId(componentId,email, createFilterDto);
    } catch (error) {
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
  removeSaved(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.removeSaved(id);
    } catch (error) {
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


}
