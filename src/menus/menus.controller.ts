import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Menús')
@Controller('menus')
@ApiBearerAuth()
export class MenusController {

  private readonly logger = new Logger(MenusController.name);
  
  constructor(private readonly menusService: MenusService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':menu_id/:language')
  @ApiOperation({ summary: 'Obtiene los ítems del menú por ID y idioma' }) // Describe la operación para Swagger
  @ApiParam({ name: 'menu_id', type: 'number', description: 'El ID del menú' }) // Parametro de menú_id
  @ApiParam({ name: 'language', type: 'string', description: 'El idioma del menú' }) // Parametro de language
  @ApiResponse({ status: 200, description: 'Lista de ítems del menú.' }) // Respuesta exitosa
  @ApiResponse({ status: 500, description: 'Error interno en el servidor.' }) // Respuesta de error
  async getMenuItems(@Param('menu_id', ParseIntPipe) menu_id: number, @Param('language') language: string) {
    try {
      this.logger.log(`Obtener los itedemes del menuco con id: ${menu_id} e idioma: ${language}`)
      // Llamar al servicio y pasar los datos validados
      return await this.menusService.getMenuItems(+menu_id, language);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al obtener los itedemes del menuco con id: ${menu_id} e idioma: ${language}: ${error}`)
      if (error instanceof HttpException) {
        throw error; // Re-lanzamos el error HTTP específico si ya fue manejado.
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }


}
