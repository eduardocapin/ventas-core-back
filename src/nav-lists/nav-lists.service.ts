import { Injectable } from '@nestjs/common';
import { CreateNavListDto } from './dto/create-nav-list.dto';
import { UpdateNavListDto } from './dto/update-nav-list.dto';

@Injectable()
export class NavListsService {
  getListItem(container_id: number, entity: string) {
    throw new Error('Method not implemented.');
  }
  getContainersByEntity(entity: string) {
    throw new Error('Method not implemented.');
  }
  create(createNavListDto: CreateNavListDto) {
    return 'This action adds a new navList';
  }

  findAll() {
    return `This action returns all navLists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} navList`;
  }

  update(id: number, updateNavListDto: UpdateNavListDto) {
    return `This action updates a #${id} navList`;
  }

  remove(id: number) {
    return `This action removes a #${id} navList`;
  }
}
