import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ImportService } from './import.service';
import { CreateImportDto } from './dto/create-import.dto';
import { UpdateImportDto } from './dto/update-import.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Importación')
@Controller('import')
@ApiBearerAuth() 
export class ImportController {
  constructor(private readonly importService: ImportService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtiene los nombres de las tablas de importación' }) 
  @ApiResponse({ status: 200, description: 'Lista de nombres de tablas de importación.' }) 
  @ApiResponse({ status: 500, description: 'Error interno en el servidor.' })
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
  @Get('field/:id')
  @ApiOperation({ summary: 'Obtiene los campos de una tabla de importación por ID' }) 
  @ApiResponse({ status: 200, description: 'Campos de la tabla de importación.' }) 
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor.' }) 
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
