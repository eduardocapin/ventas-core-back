import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientRepository } from './repositories/clients.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientContact } from './entities/client-contact.entity';
import { ClientContactRepository } from './repositories/client-contacts.repository';
import { ClientSegmentationRepository } from './repositories/client-segmentations.repository';
import { ClientSegmentation } from './entities/client-segmentation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, ClientRepository, ClientContact,ClientContactRepository, ClientSegmentation, ClientSegmentationRepository]),],
  controllers: [ClientsController],
  providers: [ClientsService, ClientRepository,ClientContactRepository, ClientSegmentationRepository],
  exports:[ClientSegmentationRepository]
})
export class ClientsModule { }
