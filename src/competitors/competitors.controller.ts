import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CompetitorsService } from './competitors.service';
import { CreateCompetitorDto } from './dto/create-competitor.dto';
import { UpdateCompetitorDto } from './dto/update-competitor.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Competidores')
@Controller('competitors')
@ApiBearerAuth() 
export class CompetitorsController {
  constructor(private readonly competitorsService: CompetitorsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo competidor' })
  @ApiResponse({ status: 201, description: 'Competidor creado exitosamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: CreateCompetitorDto })
  create(@Body() createCompetitorDto: CreateCompetitorDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      const competitor = this.competitorsService.create(createCompetitorDto);
      return { status: 'Success', ...competitor };
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los competidores' })
  @ApiResponse({ status: 200, description: 'Lista de competidores obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  findAll() {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.competitorsService.findAll();
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un competidor por ID' })
  @ApiResponse({ status: 200, description: 'Competidor encontrado.' })
  @ApiResponse({ status: 404, description: 'Competidor no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del competidor' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      const competidor =  this.competitorsService.findOne(id);
      if (!competidor) {
        throw new HttpException('Competidor no encontrado', HttpStatus.NOT_FOUND);
      }
      return competidor
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('family/:id')
  @ApiOperation({ summary: 'Obtener familias de un competidor' })
  @ApiResponse({ status: 200, description: 'Familias obtenidas exitosamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del competidor' })
  findFamilies(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      return this.competitorsService.findFamiliesByCompetitorId(+id);
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un competidor' })
  @ApiResponse({ status: 200, description: 'Competidor actualizado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Debe proporcionar al menos un campo para actualizar.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del competidor' })
  @ApiBody({ type: UpdateCompetitorDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompetitorDto: UpdateCompetitorDto
  ) {
    try {
      const { name, product_segmentation_ids } = updateCompetitorDto;

      // Validar que al menos uno de los campos esté presente
      if (!name && !product_segmentation_ids) {
        throw new HttpException(
          { message: 'At least one field (name or product_segmentation_ids) is required.' },
          HttpStatus.BAD_REQUEST,
        );
      }
      // Verificar qué campos actualizar
      if (name) {
        this.competitorsService.updateName(id, name);
      }

      if (product_segmentation_ids) {
        this.competitorsService.updateSegmentations(id, product_segmentation_ids);
      }

      return { status: 'Success', message: 'Competitor updated successfully' };
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un competidor por ID' })
  @ApiResponse({ status: 200, description: 'Competidor eliminado correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del competidor' })
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      // Llamar al servicio y pasar los datos validados
      const result = this.competitorsService.remove(id);
      /* if (!result.affectedRows) {
        throw new HttpException('Competidor no encontrado', HttpStatus.NOT_FOUND);
      } */
      return { status: 'Success', message: 'Competidor eliminado correctamente'};
    } catch (error) {
      throw new HttpException(
        { message: 'Ha ocurrido un error durante la petición.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
