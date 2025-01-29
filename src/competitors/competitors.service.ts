import { Injectable } from '@nestjs/common';
import { CreateCompetitorDto } from './dto/create-competitor.dto';
import { UpdateCompetitorDto } from './dto/update-competitor.dto';

@Injectable()
export class CompetitorsService {
  create(createCompetitorDto: CreateCompetitorDto) {
    const { nombre, product_segmentation_ids } = createCompetitorDto;

    //Insertar Competidor 
    
    const competidorId = 1;

    if (Array.isArray(product_segmentation_ids) && product_segmentation_ids.length > 0) {
      const values = product_segmentation_ids.map((id) => [competidorId, id]);
      // Insertar en Competitor_segmentations
      
    }

    return {
      competidorId,
      product_segmentation_ids: product_segmentation_ids || [],
      message: product_segmentation_ids?.length ? 'Competidor creado con segmentaciones.' : 'Competidor creado sin segmentaciones.',
    };
  }


  findAll() {
    return `This action returns all competitors`;
  }

  findOne(id: number) {
    
    return `This action returns a #${id} competitor`;
  }

  findFamiliesByCompetitorId(id: number) {
    return `This action returns a #${id} competitor`;
  }

  updateName(id: number, name: string) {
    return `This action updates a #${id} competitor`;
  }

  updateSegmentations(id: number, product_segmentation_ids: number[]) {
    return `This action updates a #${id} competitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} competitor`;
  }
}
