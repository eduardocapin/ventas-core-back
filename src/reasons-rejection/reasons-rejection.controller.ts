import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { ReasonsRejectionService } from './reasons-rejection.service';
import { CreateReasonsRejectionDto } from './dto/create-reasons-rejection.dto';
import { UpdateReasonsRejectionDto } from './dto/update-reasons-rejection.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Motivos de rechazo')
@Controller('reasons-rejection')
@ApiBearerAuth() 
export class ReasonsRejectionController {

  private readonly logger = new Logger(ReasonsRejectionController.name);
  
  constructor(private readonly reasonsRejectionService: ReasonsRejectionService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo motivo de rechazo' })
  @ApiResponse({ status: 201, description: 'Motivo de rechazo creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Petición incorrecta.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  async create(@Body() createReasonsRejectionDto: CreateReasonsRejectionDto) {
    try {
      this.logger.log(`Creacion de un nuevo rechazo:`)
      console.log('DTO recibido:', createReasonsRejectionDto);
      const data = await this.reasonsRejectionService.create(createReasonsRejectionDto);
      return {status: "Success", data}
    } catch (error) {
      this.logger.error(`Ha ocurrido un error durante la creacion del rechazo: ${error.message}`)
      console.log('Error completo:', error);
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
  async findAll() {
    try {
      this.logger.log(`Solicitud de los motivos de rechazo`)
      // Llamar al servicio y pasar los datos validados
      return await this.reasonsRejectionService.findAll();
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido u error durante la obtencion de los motivos de rechazo: ${error}`)
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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      this.logger.log(`Obtener el motivo de rechazo con id: ${id}`)
      // Llamar al servicio y pasar los datos validados
      return await this.reasonsRejectionService.findOne(+id);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la obtencion del motivo de rechazo(${id}): ${error}`)
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
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateReasonsRejectionDto: UpdateReasonsRejectionDto) {
    try {
      this.logger.log(`Actualizacion del motivo de rechazo (${id}): ${updateReasonsRejectionDto}`)
      console.log(updateReasonsRejectionDto)
      this.logger.debug(updateReasonsRejectionDto)
      // Llamar al servicio y pasar los datos validados
      
      const data = await this.reasonsRejectionService.update(+id, updateReasonsRejectionDto);
      return {status: "Success", data}
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la actualizacion del motivo de rechazo (${id}): ${error}`)
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
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      this.logger.log(`Solicitud de eliminar un motivo de rechazo con id: ${id}`)
      // Llamar al servicio y pasar los datos validados
      const data = await this.reasonsRejectionService.remove(+id);
      return {status: "Success", data}
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la eliminacion del motivo de rechazo(${id}): ${error}`)
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
