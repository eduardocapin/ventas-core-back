import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { RejectsService } from './rejects.service';
import { UpdateRejectDto } from './dto/update-reject.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { UpdateRejectCorrectiveActionDto } from './dto/update-reject-corrective-action.dto';
import { PaginatedRejectsDto } from './dto/paginated-reject.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Rechazos')
@Controller('rejects')
@ApiBearerAuth()
export class RejectsController {
  constructor(private readonly rejectsService: RejectsService) { }



  @UseGuards(JwtAuthGuard)
  @Post('list')
  @ApiOperation({ summary: 'Obtener rechazos paginados' })
  @ApiResponse({ status: 200, description: 'Lista de rechazos obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: PaginatedRejectsDto })
  async findAll(@Body() paginatedRejectsDto: PaginatedRejectsDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.findAll(paginatedRejectsDto);
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
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Rechazo encontrado.' })
  @ApiResponse({ status: 404, description: 'Rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rechazo' })
  async findOne(@Param('id', ParseIntPipe) id: number) {

    try {
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.findOne(+id);
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
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Rechazo actualizado.' })
  @ApiResponse({ status: 404, description: 'Rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rechazo' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRejectDto: UpdateRejectDto) {

    try {
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.update(+id, updateRejectDto);
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
  @Patch('corrective-action/:id')
  @ApiOperation({ summary: 'Actualizar la acción correctora de un rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Acción correctora actualizada.' })
  @ApiResponse({ status: 404, description: 'Rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rechazo' })
  async updateCorrectiveAction(@Param('id', ParseIntPipe) id: number, @Body() updateRejectCorrectiveActionDto: UpdateRejectCorrectiveActionDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.updateCorrectiveAction(+id, updateRejectCorrectiveActionDto);
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
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Rechazo eliminado.' })
  @ApiResponse({ status: 404, description: 'Rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rechazo' })
  async remove(@Param('id', ParseIntPipe) id: number) {

    try {
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.remove(+id);
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
