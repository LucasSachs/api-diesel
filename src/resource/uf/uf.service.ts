import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Uf } from 'src/database/entities/uf/uf.entity'
import type { DeepPartial, FindManyOptions, Repository } from 'typeorm'

@Injectable()
export class UfService {
  constructor(
        @InjectRepository(Uf) private readonly ufRepository: Repository<Uf>,
  ) {}

  async save(uf: DeepPartial<Uf>) {
    const savedUf = await this.ufRepository.save(uf)

    return savedUf
  }

  async find(filters?: FindManyOptions<Uf>) {
    const ufs = await this.ufRepository.find(filters)

    return ufs
  }
}
