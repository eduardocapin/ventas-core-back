import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth/jwt-auth.guard';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':menu_id/:language')
  getMenuItems(@Param('menu_id', ParseIntPipe) menu_id: number,@Param('language') language: string) {
    try {
          // Llamar al servicio y pasar los datos validados
          return this.menusService.getMenuItems(+menu_id, language);
        } catch (error) {
          throw new HttpException(
            { message: 'Ha ocurrido un error durante la petición.', error },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
    
  }

  
}
