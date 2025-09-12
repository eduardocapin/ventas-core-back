import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClientContact } from "../entities/client-contact.entity";


@Injectable()
export class ClientContactRepository extends Repository<ClientContact> {

  private readonly logger = new Logger(ClientContactRepository.name);

  constructor(@InjectRepository(ClientContact) private readonly repo: Repository<ClientContact>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async findContactById(id: number): Promise<ClientContact> {
    return await this.repo.findOne({ where: { id, deleted: false } });
  }

  async findAllContactsByClientId(id: number): Promise<ClientContact[]> {
    const contacts = await this.repo.find({
      where: {
        customer_id: id,
        deleted: false,
      },
    });

    if (!contacts.length) {
      this.logger.warn(`No se han encontrado coontactos para el cliente con id: ${id}`)
      throw new HttpException('No se encontraron contactos para este cliente.', HttpStatus.NOT_FOUND);
    }

    return contacts;
  }


}