import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe, Inject } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { PaginatedClientsDto } from './dto/paginated-client.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('clients')
@ApiBearerAuth()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService, @Inject('LOGGER') private readonly logger) { }

  @UseGuards(JwtAuthGuard)
  @Post('list')
  @ApiOperation({ summary: 'Obtener clientes paginados' })
  @ApiResponse({ status: 200, description: 'Lista de clientes obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: PaginatedClientsDto })
  async findAll(@Body() paginatedClientsDto: PaginatedClientsDto) {
    this.logger.info('Se ha solicitado la lista de clientes');

    this.logger.debug(`Paginacion de clientes: ${paginatedClientsDto}`);
    console.log(paginatedClientsDto)
    try {
      // Llamar al servicio y pasar los datos validados
      return await this.clientsService.findAll(paginatedClientsDto);
    } catch (error) {
      this.logger.error(`Ha ocurrido un error al obtener la lista de clientes: ${error}`);
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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.info('Se ha solicitado una busqueda de cliente');
    try {
      // Llamar al servicio y pasar los datos validados
      const cliente = await this.clientsService.findOne(id);
      if (!cliente) {
        this.logger.warn(`Cliente no encontrado con id: ${id}`)
        throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
      }
      return cliente;
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al obtener el cliente(${id}): ${error}`)
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
  async findAllContacts(@Param('id', ParseIntPipe) id: number) {
    this.logger.info('Se ha solicitado la lista de conctactos de un cliente');
    try {
      // Llamar al servicio y pasar los datos validados

      const contactos = await this.clientsService.findAllContacts(+id);
      if (!contactos) {
        this.logger.warn(`Contactos no encontrados para el cliente con id: ${id}`)
        throw new HttpException('Contactos no encontrados para este cliente', HttpStatus.NOT_FOUND);
      }
      return contactos;
    } catch (error) {
      this.logger.error(error)
      console.log(`Ha ocurrido un error en la busqueda de contactos para el cliente(${id}): ${error}`);
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
  async findOneContact(@Param('id', ParseIntPipe) id: number) {
    this.logger.info('Se ha solicitado un contacto');
    try {
      // Llamar al servicio y pasar los datos validados
      const contacto = await this.clientsService.findOneContact(+id);
      if (!contacto) {
        this.logger.warn(`Contacto no encontrado con id: ${id}`)
        throw new HttpException('Contacto no encontrado', HttpStatus.NOT_FOUND);
      }
      return contacto;
    } catch (error) {
      this.logger.error(error)
      console.log(`Ha ocurrido un error en la solicitud del contacto(${id}): ${error}`);
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
