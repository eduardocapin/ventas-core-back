import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RejectsService } from './rejects.service';
import { CreateRejectDto } from './dto/create-reject.dto';
import { UpdateRejectDto } from './dto/update-reject.dto';

@Controller('rejects')
export class RejectsController {
  constructor(private readonly rejectsService: RejectsService) {}

  @Post()
  create(@Body() createRejectDto: CreateRejectDto) {
    return this.rejectsService.create(createRejectDto);
  }

  @Get()
  findAll() {
    return this.rejectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rejectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRejectDto: UpdateRejectDto) {
    return this.rejectsService.update(+id, updateRejectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rejectsService.remove(+id);
  }
}
