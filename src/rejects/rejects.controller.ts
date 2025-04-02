import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
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
  constructor(private readonly rejectsService: RejectsService) { }



  @UseGuards(JwtAuthGuard)
  @Post('list')
  @ApiOperation({ summary: 'Obtener rechazos paginados' })
  @ApiResponse({ status: 200, description: 'Lista de rechazos obtenida con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: PaginatedRejectsDto })
  async findAll(@Body() paginatedRejectsDto: PaginatedRejectsDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.findAll(paginatedRejectsDto);
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
  @Post('KPIs')
  @ApiOperation({ summary: 'Obtener KPIs de los rechazos' })
  @ApiResponse({ status: 200, description: 'KPIs obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: KPIsRejectsDto })
  async kpis(@Body() KPIsRejectsDto: KPIsRejectsDto) {
    try {
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.KPIs(KPIsRejectsDto);
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
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Rechazo encontrado.' })
  @ApiResponse({ status: 404, description: 'Rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rechazo' })
  async findOne(@Param('id', ParseIntPipe) id: number) {

    try {
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.findOne(+id);
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
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Rechazo actualizado.' })
  @ApiResponse({ status: 404, description: 'Rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rechazo' })
  @ApiBody({ type: UpdateRejectDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRejectDto: UpdateRejectDto) {

    try {
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.update(+id, updateRejectDto);
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
      return await this.rejectsService.updateCorrectiveAction(+id, updateRejectCorrectiveActionDto);
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
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un rechazo por ID' })
  @ApiResponse({ status: 200, description: 'Rechazo eliminado.' })
  @ApiResponse({ status: 404, description: 'Rechazo no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error del servidor.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del rechazo' })
  async remove(@Param('id', ParseIntPipe) id: number) {

    try {
      // Llamar al servicio y pasar los datos validados
      return await this.rejectsService.remove(+id);
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
  @Post('group-by-reasons')
  @ApiOperation({ summary: 'Agrupar rechazos por motivos' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByReasons(@Body() selectedFilters: SelectedFilterDto) {
    try {
      return await this.rejectsService.getRejectionGroupByReasons(selectedFilters.selectedFilters);
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
  @Post('group-by-family/:topN')
  @ApiOperation({ summary: 'Agrupar rechazos por familia' })
  @ApiParam({ name: 'topN', type: Number, description: 'Número de elementos a retornar' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByFamily(@Body() selectedFilters: SelectedFilterDto, @Param('topN', ParseIntPipe) topN: number) {
    try {
      return await this.rejectsService.getRejectionGroupByFamily(selectedFilters.selectedFilters, topN);
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
  @Post('group-by-product/:topN')
  @ApiOperation({ summary: 'Agrupar rechazos por producto' })
  @ApiParam({ name: 'topN', type: Number, description: 'Número de elementos a retornar' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByProduct(@Body() selectedFilters: SelectedFilterDto, @Param('topN', ParseIntPipe) topN: number) {
    try {
      return await this.rejectsService.getRejectionGroupByProduct(selectedFilters.selectedFilters, topN);
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Error en el servidor. Intenta de nuevo más tarde.', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }}

  @UseGuards(JwtAuthGuard)
  @Post('group-by-segmentation/:n')
  @ApiOperation({ summary: 'Agrupar rechazos por segmentación de clientes' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiParam({ name: 'n', type: Number, description: 'Número de segmentacion de cliente' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByCustomerSegmentation(@Body() selectedFilters: SelectedFilterDto, @Param('n', ParseIntPipe) n: number) {
    try {
      return await this.rejectsService.getRejectionGroupByCustomerSegmentation(selectedFilters.selectedFilters, n);
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
  @Post('group-by-month')
  @ApiOperation({ summary: 'Agrupar rechazos por mes' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByMonth(@Body() selectedFilters: SelectedFilterDto) {
    try {
      return await this.rejectsService.getRejectionGroupByMonth(selectedFilters.selectedFilters);
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
  @Post('group-by-day-of-week')
  @ApiOperation({ summary: 'Agrupar rechazos por día de la semana' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionGroupByDayOfWeek(@Body() selectedFilters: SelectedFilterDto) {
    try {
      return await this.rejectsService.getRejectionGroupByDayOfWeek(selectedFilters.selectedFilters);
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
  @Post('clients-with-rejections')
  @ApiOperation({ summary: 'Obtener clientes con y sin rechazos' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getClientsWithRejections(@Body() selectedFilters: SelectedFilterDto) {
    try {
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
      return await this.rejectsService.getRejectionsSummaryGroupByCustomerSegmentation(selectedFilters.selectedFilters, n);
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
  @Post('summary/group-by-customer')
  @ApiOperation({ summary: 'Resumen de rechazos agrupados por clientes' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionsSummaryGroupByCustomer(@Body() selectedFilters: SelectedFilterDto) {
    try {
      return await this.rejectsService.getRejectionsSummaryGroupByCustomer(selectedFilters.selectedFilters);
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
  @Post('summary/group-by-city')
  @ApiOperation({ summary: 'Resumen de rechazos agrupados por poblacion' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionsSummaryGroupByCity(@Body() selectedFilters: SelectedFilterDto) {
    try {
      return await this.rejectsService.getRejectionsSummaryGroupByCity(selectedFilters.selectedFilters);
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
  @Post('summary/group-by-province')
  @ApiOperation({ summary: 'Resumen de rechazos agrupados por provincia' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionsSummaryGroupByProvince(@Body() selectedFilters: SelectedFilterDto) {
    try {
      return await this.rejectsService.getRejectionsSummaryGroupByProvince(selectedFilters.selectedFilters);
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
  @Post('summary/group-by-family')
  @ApiOperation({ summary: 'Resumen de rechazos agrupados por familia' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionsSummaryGroupByFamily(@Body() selectedFilters: SelectedFilterDto) {
    try {
      return await this.rejectsService.getRejectionsSummaryGroupByFamily(selectedFilters.selectedFilters);
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
  @Post('summary/group-by-salesman')
  @ApiOperation({ summary: 'Resumen de rechazos agrupados por vendedores' })
  @ApiResponse({ status: 200, description: 'Datos agrupados obtenidos con éxito.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiBody({ type: [SelectedFilterDto] })
  async getRejectionsSummaryGroupBySalesman(@Body() selectedFilters: SelectedFilterDto) {
    try {
      return await this.rejectsService.getRejectionsSummaryGroupBySalesman(selectedFilters.selectedFilters);
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
}
