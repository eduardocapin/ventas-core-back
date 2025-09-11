import { Repository } from "typeorm";
import { Config } from "../entities/config.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";


@Injectable()
export class ConfigRepository extends Repository<Config> {


  constructor(@InjectRepository(Config) private readonly repo: Repository<Config>, @Inject('LOGGER') private readonly logger) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async getDomain(): Promise<string> {
    try {
      const result = await this.repo.findOneOrFail({
        where: { argument: 'domain' },
        select: ['variable'],
      });

      return result.variable;
    } catch (error) {
      this.logger.error(`Ha ocurrido un error al obtener el dominio: ${error}`)
      throw new HttpException('Dominio no encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
