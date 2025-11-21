import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe, Inject, Logger, Req } from '@nestjs/common';
import { NavListsService } from './nav-lists.service';
import { CreateNavListDto } from './dto/create-nav-list.dto';
import { UpdateNavListDto } from './dto/update-nav-list.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Listas navegables')
@Controller('nav-lists')
@ApiBearerAuth()
export class NavListsController {

  private readonly logger = new Logger(NavListsController.name);
  constructor(private readonly navListsService: NavListsService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':entinty')
  @ApiOperation({ summary: 'Obtiene los contenedores de una entidad' })
  @ApiParam({ name: 'entity', type: 'string', description: 'Nombre de la entidad' })
  @ApiResponse({ status: 200, description: 'Lista de contenedores de la entidad.' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor.' })
  async getContainers(@Param('entity') entity: string, @Req() req: Request) {
    this.logger.log(`Se han solicitado los contenedores para la entidad: ${entity}`)
    try {
      // Extraer permisos del usuario del JWT
      const user = req['user'];
      const userPermissionNames = user?.permissions || [];
      
      this.logger.log(`Usuario con permisos: [${userPermissionNames.join(', ')}]`);
      
      // Verificar si tiene el permiso VISUALIZADO_USUARIOS
      const hasUserViewPermission = userPermissionNames.includes('VISUALIZADO_USUARIOS');
      
      // Llamar al servicio y pasar si tiene el permiso
      return await this.navListsService.getContainersByEntity(entity, hasUserViewPermission);
    } catch (error) {
      this.logger.error(`Ha ocurrido un error durante la solicitud de los contenedores para la entidad(${entity}): ${error}`)
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
