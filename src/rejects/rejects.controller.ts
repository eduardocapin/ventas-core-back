import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { RejectsService } from './rejects.service';
import { UpdateRejectDto } from './dto/update-reject.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { UpdateRejectCorrectiveActionDto } from './dto/update-reject-corrective-action.dto';
import { PaginatedRejectsDto } from './dto/paginated-reject.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KPIsRejectsDto } from './dto/kpis-rejects.dto';
import { FilterDto } from 'src/filters/dto/filter.dto';
import { SelectedFilterDto } from 'src/filters/dto/selected-filters.dto';

@ApiTags('Rechazos')
@Controller('rejects')
@ApiBearerAuth()
export class RejectsController {
  constructor(private readonly rejectsService: RejectsService, @Inject('LOGGER') private readonly logger) { }



  @UseGuards(JwtAuthGuard)
  @Post('list')
  @ApiOperation({ summary: 'Obtener rechazos paginados' })
  @ApiResponse({ status: 200, description: 'Lista de rechazos obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: PaginatedRejectsDto })
  async findAll(@Body() paginatedRejectsDto: PaginatedRejectsDto) {
    try {
      this.logger.info('Obtener la lista de rechazos')
      this.logger.debug(paginatedRejectsDto)
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.findAll(paginatedRejectsDto);
    } catch (error) {
      this.logger.error(`Ha ocurrido un error al obtener la lista de rechazos: ${error}`)
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

  @UseGuards(JwtAuthGuard)
  @Post('KPIs')
  @ApiOperation({ summary: 'Obtener KPIs de los rechazos' })
  @ApiResponse({ status: 200, description: 'KPIs obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: KPIsRejectsDto })
  async kpis(@Body() KPIsRejectsDto: KPIsRejectsDto) {
    try {
      this.logger.info('Obtener kpis de los rechazos')
      this.logger.debug(KPIsRejectsDto)
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.KPIs(KPIsRejectsDto);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al obtener los KPIs: ${error}`)
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
  @ApiOperation({ summary: 'Obtener un rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Rechazo encontrado.' })
  @ApiResponse({ status: 404, description: 'Rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rechazo' })
  async findOne(@Param('id', ParseIntPipe) id: number) {

    try {
      this.logger.info(`Obtener el reachazo con id: ${id}`)
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.findOne(+id);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la obtencion del rechazo(${id}): ${error}`)
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
  @ApiOperation({ summary: 'Actualizar un rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Rechazo actualizado.' })
  @ApiResponse({ status: 404, description: 'Rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rechazo' })
  @ApiBody({ type: UpdateRejectDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRejectDto: UpdateRejectDto) {

    try {
      this.logger.info(`Actualizar rechazo con id: ${id}, ${updateRejectDto}`)
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.update(+id, updateRejectDto);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la actualizacion del rechazo(${id}): ${error}`)
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
  @Patch('corrective-action/:id')
  @ApiOperation({ summary: 'Actualizar la acción correctora de un rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Acción correctora actualizada.' })
  @ApiResponse({ status: 404, description: 'Rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rechazo' })
  @ApiBody({ type: UpdateRejectCorrectiveActionDto })
  async updateCorrectiveAction(@Param('id', ParseIntPipe) id: number, @Body() updateRejectCorrectiveActionDto: UpdateRejectCorrectiveActionDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      this.logger.info(`Actualizar la accion correctora del rechazo con id: ${id}, ${updateRejectCorrectiveActionDto}`)
      return await this.rejectsService.updateCorrectiveAction(+id, updateRejectCorrectiveActionDto);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error durante la actualizacion de la accion correctora del rechazo(${id}): ${error}`)
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
  @ApiOperation({ summary: 'Eliminar un rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Rechazo eliminado.' })
  @ApiResponse({ status: 404, description: 'Rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rechazo' })
  async remove(@Param('id', ParseIntPipe) id: number) {

    try {
      this.logger.info(`Eliminar rechazo con id: ${id}`)
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.remove(+id);
    } catch (error) {
      console.log(error);
      this.logger.error(`Error durante la eliminacion del rechazo(${id}): ${error}`)
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
  @Post('group-by-reasons')
  @ApiOperation({ summary: 'Agrupar rechazos por motivos' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByReasons(@Body() selectedFilters: SelectedFilterDto) {
    try {
      this.logger.info(`Agrupar rechazos por motivos: ${selectedFilters}`)
      return await this.rejectsService.getRejectionGroupByReasons(selectedFilters.selectedFilters);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al agrupar los rechazos por sus motivos: ${error}`)
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
  @Post('group-by-family/:topN')
  @ApiOperation({ summary: 'Agrupar rechazos por familia' })
  @ApiParam({ name: 'topN', type: Number, description: 'Número de elementos a retornar' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByFamily(@Body() selectedFilters: SelectedFilterDto, @Param('topN', ParseIntPipe) topN: number) {
    try {
      this.logger.info(`Agrupar rechazos por familia, Top: ${topN}, ${selectedFilters}`)
      return await this.rejectsService.getRejectionGroupByFamily(selectedFilters.selectedFilters, topN);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al agrupar los rechazos por familia: ${error}`)
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
  @Post('group-by-product/:topN')
  @ApiOperation({ summary: 'Agrupar rechazos por producto' })
  @ApiParam({ name: 'topN', type: Number, description: 'Número de elementos a retornar' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByProduct(@Body() selectedFilters: SelectedFilterDto, @Param('topN', ParseIntPipe) topN: number) {
    try {
      this.logger.info(`Agrupar rechazos por producto, Top: ${topN}, ${selectedFilters}`)
      return await this.rejectsService.getRejectionGroupByProduct(selectedFilters.selectedFilters, topN);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al agrupar los rechazos por producto: ${error}`)
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
  @Post('group-by-segmentation/:n')
  @ApiOperation({ summary: 'Agrupar rechazos por segmentación de clientes' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'n', type: Number, description: 'Número de segmentacion de cliente' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByCustomerSegmentation(@Body() selectedFilters: SelectedFilterDto, @Param('n', ParseIntPipe) n: number) {
    try {
      this.logger.info(`Agrupar rechazos por semegntacion de cliente ${n}, ${selectedFilters}`)
      return await this.rejectsService.getRejectionGroupByCustomerSegmentation(selectedFilters.selectedFilters, n);
    } catch (error) {
      console.log(error);
      this.logger.error(`Error al agrupar rechazos por semegntacion de cliente ${n}:${error}`)
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
  @Post('group-by-month')
  @ApiOperation({ summary: 'Agrupar rechazos por mes' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByMonth(@Body() selectedFilters: SelectedFilterDto) {
    try {
      this.logger.info(`Agrupar rechazos por mes, ${selectedFilters}`)
      return await this.rejectsService.getRejectionGroupByMonth(selectedFilters.selectedFilters);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al agrupar rechazos por mes: ${error}`)
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
  @Post('group-by-day-of-week')
  @ApiOperation({ summary: 'Agrupar rechazos por día de la semana' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByDayOfWeek(@Body() selectedFilters: SelectedFilterDto) {
    try {
      this.logger.info(`Agrupar rechazos por dia de la semana: ${selectedFilters}`)
      return await this.rejectsService.getRejectionGroupByDayOfWeek(selectedFilters.selectedFilters);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido un error al agrupr rechazos por dia de la semana: ${error}`)
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
  @Post('clients-with-rejections')
  @ApiOperation({ summary: 'Obtener clientes con y sin rechazos' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getClientsWithRejections(@Body() selectedFilters: SelectedFilterDto) {
    try {
      this.logger.info(`Obtener cleintes con y sin rechazos, ${selectedFilters}`)
      return await this.rejectsService.getClientsWithRejections(selectedFilters.selectedFilters);
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

  @UseGuards(JwtAuthGuard)
  @Post('summary/group-by-segmentation/:n')
  @ApiOperation({ summary: 'Resumen de rechazos agrupados por segmentación de clientes' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'n', type: Number, description: 'Número de segmentacion de cliente' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionsSummaryGroupByCustomerSegmentation(@Body() selectedFilters: SelectedFilterDto, @Param('n', ParseIntPipe) n: number) {
    try {
      this.logger.info(`Resumen de rechazos agrupados por semegntacion de cliente ${n}, ${selectedFilters}`)
      return await this.rejectsService.getRejectionsSummaryGroupByCustomerSegmentation(selectedFilters.selectedFilters, n);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido durante la obtencion del resumen de rechazos agrupados por semegntacion de cliente ${n}, ${error}`)
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
  @Post('summary/group-by-customer')
  @ApiOperation({ summary: 'Resumen de rechazos agrupados por clientes' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionsSummaryGroupByCustomer(@Body() selectedFilters: SelectedFilterDto) {
    try {
      this.logger.info(`Resumen de rechazos agrupados por cliente, ${selectedFilters}`)
      return await this.rejectsService.getRejectionsSummaryGroupByCustomer(selectedFilters.selectedFilters);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido durante la obtencion del resumen de rechazos agrupados por cliente: ${error}`)
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
  @Post('summary/group-by-city')
  @ApiOperation({ summary: 'Resumen de rechazos agrupados por poblacion' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionsSummaryGroupByCity(@Body() selectedFilters: SelectedFilterDto) {
    try {
      this.logger.info(`Resumen de rechazos agrupados por poblacion, ${selectedFilters}`)
      return await this.rejectsService.getRejectionsSummaryGroupByCity(selectedFilters.selectedFilters);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido durante la obtencion del resumen de rechazos agrupados por poblacion: ${error}`)

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
  @Post('summary/group-by-province')
  @ApiOperation({ summary: 'Resumen de rechazos agrupados por provincia' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionsSummaryGroupByProvince(@Body() selectedFilters: SelectedFilterDto) {
    try {
      this.logger.info(`Resumen de rechazos agrupados por provincia, ${selectedFilters}`)
      return await this.rejectsService.getRejectionsSummaryGroupByProvince(selectedFilters.selectedFilters);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido durante la obtencion del resumen de rechazos agrupados por provincia: ${error}`)

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
  @Post('summary/group-by-family')
  @ApiOperation({ summary: 'Resumen de rechazos agrupados por familia' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionsSummaryGroupByFamily(@Body() selectedFilters: SelectedFilterDto) {
    try {
      this.logger.info(`Resumen de rechazos agrupados por familia, ${selectedFilters}`)
      return await this.rejectsService.getRejectionsSummaryGroupByFamily(selectedFilters.selectedFilters);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido durante la obtencion del resumen de rechazos agrupados por familia: ${error}`)
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
  @Post('summary/group-by-salesman')
  @ApiOperation({ summary: 'Resumen de rechazos agrupados por vendedores' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionsSummaryGroupBySalesman(@Body() selectedFilters: SelectedFilterDto) {
    try {
      this.logger.info(`Resumen de rechazos agrupados por vendedores, ${selectedFilters}`)
      return await this.rejectsService.getRejectionsSummaryGroupBySalesman(selectedFilters.selectedFilters);
    } catch (error) {
      console.log(error);
      this.logger.error(`Ha ocurrido durante la obtencion del resumen de rechazos agrupados por vendedores: ${error}`)

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
