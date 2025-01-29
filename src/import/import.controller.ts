import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ImportService } from './import.service';
import { CreateImportDto } from './dto/create-import.dto';
import { UpdateImportDto } from './dto/update-import.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth/jwt-auth.guard';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getImportTablesName() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.importService.getImportTablesName();
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get('saved/:id')
  getImportTablesField(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.importService.getImportTablesField(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    
  }

}
