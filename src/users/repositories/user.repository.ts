import {Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<User> {

    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async findUserById(id: number): Promise<User> {
        return this.repo.findOne({ where: { id, deleted: false } });
    }

    async findUserByEmail(email: string): Promise<User> {
        console.log(`Buscando usuario por email: ${email}`);
        return this.repo.findOne({ where: { email, deleted: false } });
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const user = this.create(userData);
        return this.save(user);
    }

    async removeById(id: number): Promise<UpdateResult> {
        return await this.repo.update(id, { deleted: false });
    }
}