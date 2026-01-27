import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { PasswordChanges } from "../entities/password-changes.entity";
import { MoreThan, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";



@Injectable()
export class PasswordChangesRepository extends Repository<PasswordChanges> {

  private readonly logger = new Logger(PasswordChangesRepository.name);

  constructor(@InjectRepository(PasswordChanges) private readonly repo: Repository<PasswordChanges>) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async removeByEmail(email: string): Promise<UpdateResult> {
    return this.repo.update({ email }, { active: false });
  }

  async findByCode(code: string): Promise<string> {
    try {
      const result = await this.repo.findOneOrFail({
        where: {
          code,
          active: true,
          date: MoreThan(new Date(Date.now() - 30 * 60 * 1000)),
        },
        select: ['email'],
      });

      return result.email;
    } catch (error) {
      this.logger.error(`Ha ocurrido un error durante la busqueda del codigo de cambio de contraseña: ${error}`)
      throw new HttpException('Código inválido o expirado', HttpStatus.NOT_FOUND);
    }
  }

}