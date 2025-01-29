import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { RejectsService } from './rejects.service';
import { CreateRejectDto } from './dto/create-reject.dto';
import { UpdateRejectDto } from './dto/update-reject.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth/jwt-auth.guard';
import { UpdateRejectCorrectiveActionDto } from './dto/update-reject-corrective-action.dto';
import { PaginatedRejectsDto } from './dto/paginated-reject.dto';

@Controller('rejects')
export class RejectsController {
  constructor(private readonly rejectsService: RejectsService) { }

  

  @UseGuards(JwtAuthGuard)
  @Post()
  findAll(@Body() paginatedRejectsDto: PaginatedRejectsDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.rejectsService.findAll(paginatedRejectsDto);
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
      return this.rejectsService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRejectDto: UpdateRejectDto) {
    
    try {
      // Llamar al servicio y pasar los datos validados
      return this.rejectsService.update(+id, updateRejectDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('corrective-action/:id')
  updateCorrectiveAction(@Param('id', ParseIntPipe) id: number, @Body() updateRejectCorrectiveActionDto: UpdateRejectCorrectiveActionDto) {
   
    try {
      // Llamar al servicio y pasar los datos validados
      return this.rejectsService.updateCorrectiveAction(+id, updateRejectCorrectiveActionDto);
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
      return this.rejectsService.remove(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
