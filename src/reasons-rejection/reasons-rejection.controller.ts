import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReasonsRejectionService } from './reasons-rejection.service';
import { CreateReasonsRejectionDto } from './dto/create-reasons-rejection.dto';
import { UpdateReasonsRejectionDto } from './dto/update-reasons-rejection.dto';

@Controller('reasons-rejection')
export class ReasonsRejectionController {
  constructor(private readonly reasonsRejectionService: ReasonsRejectionService) {}

  @Post()
  create(@Body() createReasonsRejectionDto: CreateReasonsRejectionDto) {
    return this.reasonsRejectionService.create(createReasonsRejectionDto);
  }

  @Get()
  findAll() {
    return this.reasonsRejectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reasonsRejectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReasonsRejectionDto: UpdateReasonsRejectionDto) {
    return this.reasonsRejectionService.update(+id, updateReasonsRejectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reasonsRejectionService.remove(+id);
  }
}
