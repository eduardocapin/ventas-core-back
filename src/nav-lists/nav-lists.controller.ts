import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { NavListsService } from './nav-lists.service';
import { CreateNavListDto } from './dto/create-nav-list.dto';
import { UpdateNavListDto } from './dto/update-nav-list.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Listas navegables')
@Controller('nav-lists')
@ApiBearerAuth() 
export class NavListsController {
  constructor(private readonly navListsService: NavListsService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':entinty')
  @ApiOperation({ summary: 'Obtiene los contenedores de una entidad' }) 
  @ApiParam({ name: 'entity', type: 'string', description: 'Nombre de la entidad' }) 
  @ApiResponse({ status: 200, description: 'Lista de contenedores de la entidad.' }) 
  @ApiResponse({ status: 500, description: 'Error interno en el servidor.' })
  async getContainers(@Param('entity') entity: string) {
    try {
      // Llamar al servicio y pasar los datos validados
      return await this.navListsService.getContainersByEntity(entity);
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
