import { PartialType } from '@nestjs/mapped-types';
import { CreateReasonsRejectionDto } from './create-reasons-rejection.dto';

export class UpdateReasonsRejectionDto extends PartialType(CreateReasonsRejectionDto) {}
