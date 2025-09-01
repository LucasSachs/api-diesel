import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cidade } from 'src/database/entities/cidade/cidade.entity'
import type { DeepPartial, FindManyOptions, Repository } from 'typeorm'

@Injectable()
export class CidadeService {
  constructor(
        @InjectRepository(Cidade) private readonly cidadeRepository: Repository<Cidade>,
  ) {}

  async save(cidade: DeepPartial<Cidade>) {
    const savedCidade = await this.cidadeRepository.save(cidade)

    return savedCidade
  }

  async find(filters?: FindManyOptions<Cidade>) {
    const cidades = await this.cidadeRepository.find(filters)

    return cidades
  }
}
