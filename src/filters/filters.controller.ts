import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth/jwt-auth.guard';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) { }


  @UseGuards(JwtAuthGuard)
  @Get('/cities')
  getCities() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getCities();
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('/provinces')
  getProvinces() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getProvinces();
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('/status')
  getStatus() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getStatus();
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('/symbol')
  getSymbol() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getSymbol();
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('/reasons-rejection')
  getReasonsRejection() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getReasonsRejection();
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('/competitors')
  getCompetitors() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getCompetitors();
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('/salesmen')
  getSalesmen() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getSalesmen();
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get(':componentId')
  findFiltersByComponetId(@Param('componentId') componentId: string) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.findFiltersByComponetId(componentId);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('segmentation/:n')
  getSegmentation(@Param('n') n: string) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getSegmentation(n);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('product-segmentation/:n')
  getProductSegmentation(@Param('n') n: string) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getProductSegmentation(n);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('saved/:componentId')
  getSavedByComponetId(@Param('componentId') componentId: string) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.getSavedByComponetId(componentId);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Post('saved/:componentId')
  createSavedByComponetId(@Param('componentId') componentId: string, @Body() createFilterDto: CreateFilterDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.createSavedByComponetId(componentId, createFilterDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Delete('saved/:id')
  removeSaved(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.filtersService.removeSaved(id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


}
