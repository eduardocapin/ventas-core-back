import {
    IsArray,
    IsOptional,
    IsString,
    IsNumber,
    ValidateNested,
    IsObject,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class FilterDto {
    @IsString()
    id: string;
  
    @IsOptional()
    @IsObject()
    valor?: any;
  
    @IsString()
    tipo: string;
  }
  
  export class PaginatedRejectsDto {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FilterDto)
    selectedFilters?: FilterDto[];
  
    @IsOptional()
    @IsString()
    searchTerm?: string;
  
    @IsNumber()
    currentPage: number;
  
    @IsNumber()
    itemsPerPage: number;
  
    @IsOptional()
    @IsString()
    sortColumn?: string;
  
    @IsOptional()
    @IsString()
    sortDirection?: string;
  }
  