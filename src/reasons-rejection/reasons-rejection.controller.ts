import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ReasonsRejectionService } from './reasons-rejection.service';
import { CreateReasonsRejectionDto } from './dto/create-reasons-rejection.dto';
import { UpdateReasonsRejectionDto } from './dto/update-reasons-rejection.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth/jwt-auth.guard';

@Controller('reasons-rejection')
export class ReasonsRejectionController {
  constructor(private readonly reasonsRejectionService: ReasonsRejectionService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReasonsRejectionDto: CreateReasonsRejectionDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.reasonsRejectionService.create(createReasonsRejectionDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.reasonsRejectionService.findAll();
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.reasonsRejectionService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReasonsRejectionDto: UpdateReasonsRejectionDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.reasonsRejectionService.update(+id, updateReasonsRejectionDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.reasonsRejectionService.remove(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
