import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterDto } from './filter.dto';



export class SelectedFilterDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  selectedFilters?: FilterDto[];
}