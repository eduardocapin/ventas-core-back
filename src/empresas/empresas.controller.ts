import { Controller, Get } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { Empresa } from './entities/empresa.entity';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Get()
  findAll(): Promise<Empresa[]> {
    return this.empresasService.findAll();
  }
}
