import { PartialType } from '@nestjs/mapped-types';
import { CreateRejectDto } from './create-reject.dto';

export class UpdateRejectDto extends PartialType(CreateRejectDto) {}
