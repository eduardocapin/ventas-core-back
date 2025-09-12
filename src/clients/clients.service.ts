import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginatedClientsDto } from './dto/paginated-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from './repositories/clients.repository';
import { ClientContactRepository } from './repositories/client-contacts.repository';
import { ClientContact } from './entities/client-contact.entity';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {

  private readonly logger = new Logger(ClientsService.name);
  constructor(
    @InjectRepository(ClientRepository)
    private readonly clientRepository: ClientRepository,
    @InjectRepository(ClientContactRepository)
    private readonly clientContactRepository: ClientContactRepository,
  ) {

  }

  async findAll(paginatedClientsDto: PaginatedClientsDto): Promise<{ items: Client[]; totalItems: number }> {
    return await this.clientRepository.findAll(paginatedClientsDto);
  }

  async findOne(id: number) {
    return await this.clientRepository.findClientById(id);
  }



  async findAllContacts(id: number): Promise<ClientContact[]> {
    return await this.clientContactRepository.findAllContactsByClientId(id)
  }

  async findOneContact(id: number): Promise<ClientContact> {
    return await this.clientContactRepository.findContactById(id);

  }

}
