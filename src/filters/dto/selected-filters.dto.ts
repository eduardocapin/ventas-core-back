import { IsArray, IsOptional, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterDto } from './filter.dto';



export class SelectedFilterDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  selectedFilters?: FilterDto[];
  
  @IsOptional()
  @IsString()
  idioma?: string;
}