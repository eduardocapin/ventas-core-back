import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, ParseIntPipe, Inject } from '@nestjs/common';
import { ImportService } from './import.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Importación')
@Controller('import')
@ApiBearerAuth() 
export class ImportController {
  constructor(private readonly importService: ImportService, @Inject('LOGGER') private readonly logger) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtiene los nombres de las tablas de importación' }) 
  @ApiResponse({ status: 200, description: 'Lista de nombres de tablas de importación.' }) 
  @ApiResponse({ status: 500, description: 'Error interno en el servidor.' })
  async getImportTablesName() {
    try {
      this.logger.info('Se ha solicitado la lista de tablas a importar')
      // Llamar al servicio y pasar los datos validados
      return await this.importService.getImportTablesName();
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la solicitud de las tablas a importar: ${error}`)
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
  @Get('field/:id')
  @ApiOperation({ summary: 'Obtiene los campos de una tabla de importación por ID' }) 
  @ApiResponse({ status: 200, description: 'Campos de la tabla de importación.' }) 
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 500, description: 'Error interno en el servidor.' }) 
  async getImportTablesField(@Param('id', ParseIntPipe) id: number) {
    try {
      this.logger.info(`Se han solicitado los campos para la tabla con id: ${id}`)
      // Llamar al servicio y pasar los datos validados
      return await this.importService.getImportTablesField(+id);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la solicitud de campos de la tabla (${id}): ${error}`)
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
