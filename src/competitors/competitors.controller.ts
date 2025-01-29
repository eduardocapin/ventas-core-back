import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CompetitorsService } from './competitors.service';
import { CreateCompetitorDto } from './dto/create-competitor.dto';
import { UpdateCompetitorDto } from './dto/update-competitor.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth/jwt-auth.guard';

@Controller('competitors')
export class CompetitorsController {
  constructor(private readonly competitorsService: CompetitorsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
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
