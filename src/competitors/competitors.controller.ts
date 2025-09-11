import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CompetitorsService } from './competitors.service';
import { CreateCompetitorDto } from './dto/create-competitor.dto';
import { UpdateCompetitorDto } from './dto/update-competitor.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Competidores')
@Controller('competitors')
@ApiBearerAuth() 
export class CompetitorsController {
  constructor(private readonly competitorsService: CompetitorsService, @Inject('LOGGER') private readonly logger) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo competidor' })
  @ApiResponse({ status: 201, description: 'Competidor creado exitosamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: CreateCompetitorDto })
  async create(@Body() createCompetitorDto: CreateCompetitorDto) {
    this.logger.info(`Se ha solicitado crear un competidor`)
    this.logger.debug(createCompetitorDto)
    try {
      // Llamar al servicio y pasar los datos validados
      const competitor = await this.competitorsService.create(createCompetitorDto);
      return { status: 'Success', ...competitor };
    } catch (error) {
      console.log(error);
      this.logger.error(`Error al crear un competidor: ${error}`)
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
  @Get()
  @ApiOperation({ summary: 'Obtener todos los competidores' })
  @ApiResponse({ status: 200, description: 'Lista de competidores obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findAll() {
    this.logger.info(`Se ha solicitado la lista de competidores`)
    try {
      // Llamar al servicio y pasar los datos validados
      return await this.competitorsService.findAll();
    } catch (error) {
      console.log(error);
      this.logger.error(`Error al obtener la lista de competidores: ${error}`)
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
  @ApiOperation({ summary: 'Obtener un competidor por ID' })
  @ApiResponse({ status: 200, description: 'Competidor encontrado.' })
  @ApiResponse({ status: 404, description: 'Competidor no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del competidor' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.info('Se ha solicitado un competidor')
    try {
      // Llamar al servicio y pasar los datos validados
      const competidor =  await this.competitorsService.findOneWithSegmentations(id);
      if (!competidor) {
        this.logger.warn(`Competidor no encontrado con id: ${id}`)
        throw new HttpException('Competidor no encontrado', HttpStatus.NOT_FOUND);
      }
      return competidor
    } catch (error) {
      console.log(error);
      this.logger.error(`Error al obtener el competidor con id (${id}): ${error}`)
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
  @Get('family/:id')
  @ApiOperation({ summary: 'Obtener familias de un competidor' })
  @ApiResponse({ status: 200, description: 'Familias obtenidas exitosamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del competidor' })
  async findFamilies(@Param('id', ParseIntPipe) id: number) {
    this.logger.info('Se ha solicitado las familas de un competidor')
    try {
      // Llamar al servicio y pasar los datos validados
      return await this.competitorsService.findFamiliesByCompetitorId(+id);
    } catch (error) {
      console.log(error);
      this.logger.error(`Error al solicitar las familias del competidor(${id}): ${error}`)
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
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un competidor' })
  @ApiResponse({ status: 200, description: 'Competidor actualizado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Debe proporcionar al menos un campo para actualizar.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del competidor' })
  @ApiBody({ type: UpdateCompetitorDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompetitorDto: UpdateCompetitorDto
  ) {
    this.logger.info(`Actualizar el competidor con id:${id}`)
    try {
      const { name, product_segmentation_ids } = updateCompetitorDto;
      this.logger.debug(  `Nueva info competidor: ${updateCompetitorDto}`)
      // Validar que al menos uno de los campos esté presente
      if (!name && !product_segmentation_ids) {
        this.logger.warn(`Error al Actualizar el compeditor(${id}): name o product_segmentation_ids es obligatorio (${updateCompetitorDto})`)
        throw new HttpException(
          { message: 'At least one field (name or product_segmentation_ids) is required.' },
          HttpStatus.BAD_REQUEST,
        );
      }
      // Verificar qué campos actualizar
      if (name) {
        await this.competitorsService.updateName(id, name);
      }

      if (product_segmentation_ids) {
        await this.competitorsService.updateSegmentations(id, product_segmentation_ids);
      }

      return { status: 'Success', message: 'Competitor updated successfully' };
    } catch (error) {
      console.log(error);
      this.logger.error(`Error al Actualizar el compeditor(${id}): ${error}`)
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
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un competidor por ID' })
  @ApiResponse({ status: 200, description: 'Competidor eliminado correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del competidor' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      this.logger.info(`Eliminar el competidor con id: ${id}`)
      // Llamar al servicio y pasar los datos validados
      const result = await this.competitorsService.remove(id);
      return { status: 'Success', message: 'Competidor eliminado correctamente'};
    } catch (error) {
      this.logger.error(`Ha ocurrido un error al eliminar el competidor(${id}): ${error}`)
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
