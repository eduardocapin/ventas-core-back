import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth/jwt-auth.guard';
import { PaginatedClientsDto } from './dto/paginated-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  findAll(@Body() paginatedClientsDto: PaginatedClientsDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.clientsService.findAll(paginatedClientsDto);
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
      return this.clientsService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('/contacts/:id')
  findAllContacts(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.clientsService.findAllContacts(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('/contacts/:id')
  findOneContact(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.clientsService.findOneContact(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
