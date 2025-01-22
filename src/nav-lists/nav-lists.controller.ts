import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NavListsService } from './nav-lists.service';
import { CreateNavListDto } from './dto/create-nav-list.dto';
import { UpdateNavListDto } from './dto/update-nav-list.dto';

@Controller('nav-lists')
export class NavListsController {
  constructor(private readonly navListsService: NavListsService) {}

  @Post()
  create(@Body() createNavListDto: CreateNavListDto) {
    return this.navListsService.create(createNavListDto);
  }

  @Get()
  findAll() {
    return this.navListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.navListsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNavListDto: UpdateNavListDto) {
    return this.navListsService.update(+id, updateNavListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.navListsService.remove(+id);
  }
}
