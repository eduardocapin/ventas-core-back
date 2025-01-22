import { PartialType } from '@nestjs/mapped-types';
import { CreateNavListDto } from './create-nav-list.dto';

export class UpdateNavListDto extends PartialType(CreateNavListDto) {}
