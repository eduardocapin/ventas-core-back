import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { PaginatedClientsDto } from './dto/paginated-client.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('clients')
@ApiBearerAuth() 
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @UseGuards(JwtAuthGuard)
  @Post('list')
  @ApiOperation({ summary: 'Obtener clientes paginados' })
  @ApiResponse({ status: 200, description: 'Lista de clientes obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: PaginatedClientsDto })
  findAll(@Body() paginatedClientsDto: PaginatedClientsDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.clientsService.findAll(paginatedClientsDto);
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
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del cliente' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      const cliente =  this.clientsService.findOne(id);
      if (!cliente) {
        throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
      }
      return cliente;
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
  @Get('contacts/:id')
  @ApiOperation({ summary: 'Obtener todos los contactos de un cliente' })
  @ApiResponse({ status: 200, description: 'Contactos encontrados.' })
  @ApiResponse({ status: 404, description: 'No se encontraron contactos.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del cliente' })
  findAllContacts(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      
      const contactos =  this.clientsService.findAllContacts(+id);
      if (!contactos) {
        throw new HttpException('Contactos no encontrados para este cliente', HttpStatus.NOT_FOUND);
      }
      return contactos;
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
  @Get('contact/:id')
  @ApiOperation({ summary: 'Obtener un contacto por ID' })
  @ApiResponse({ status: 200, description: 'Contacto encontrado.' })
  @ApiResponse({ status: 404, description: 'Contacto no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del contacto' })
  findOneContact(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      const contacto =  this.clientsService.findOneContact(+id);
      if (!contacto) {
        throw new HttpException('Contacto no encontrado', HttpStatus.NOT_FOUND);
      }
      return contacto;
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
