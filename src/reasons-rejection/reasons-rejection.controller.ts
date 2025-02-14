import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ReasonsRejectionService } from './reasons-rejection.service';
import { CreateReasonsRejectionDto } from './dto/create-reasons-rejection.dto';
import { UpdateReasonsRejectionDto } from './dto/update-reasons-rejection.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Motivos de rechazo')
@Controller('reasons-rejection')
@ApiBearerAuth() 
export class ReasonsRejectionController {
  constructor(private readonly reasonsRejectionService: ReasonsRejectionService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo motivo de rechazo' })
  @ApiResponse({ status: 201, description: 'Motivo de rechazo creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Petición incorrecta.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  create(@Body() createReasonsRejectionDto: CreateReasonsRejectionDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.reasonsRejectionService.create(createReasonsRejectionDto);
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
  @Get()
  @ApiOperation({ summary: 'Obtener todos los motivos de rechazo' })
  @ApiResponse({ status: 200, description: 'Lista de motivos de rechazo.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  findAll() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.reasonsRejectionService.findAll();
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
  @ApiOperation({ summary: 'Obtener un motivo de rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Motivo de rechazo encontrado.' })
  @ApiResponse({ status: 404, description: 'Motivo de rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del motivo de rechazo' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.reasonsRejectionService.findOne(+id);
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
  @ApiOperation({ summary: 'Actualizar un motivo de rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Motivo de rechazo actualizado.' })
  @ApiResponse({ status: 404, description: 'Motivo de rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del motivo de rechazo' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReasonsRejectionDto: UpdateReasonsRejectionDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.reasonsRejectionService.update(+id, updateReasonsRejectionDto);
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
  @ApiOperation({ summary: 'Eliminar un motivo de rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Motivo de rechazo eliminado.' })
  @ApiResponse({ status: 404, description: 'Motivo de rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del motivo de rechazo' })
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.reasonsRejectionService.remove(+id);
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
