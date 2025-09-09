import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OrdemServico } from 'src/database/entities/ordem-servico/ordem-servico.entity'
import type { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class OrdemServicoService {
  constructor(
    @InjectRepository(OrdemServico) private readonly ordemServicoRepository: Repository<OrdemServico>,
  ) {}

  async find(filters: FindManyOptions<OrdemServico>) {
    const whereOptions = filters.where as FindOptionsWhere<OrdemServico>

    const ordensServico = await this.ordemServicoRepository.find({
      ...filters,
      where: {
        ...whereOptions,
      },
    })

    return ordensServico
  }

  async save(ordemServico: DeepPartial<OrdemServico>) {
    const savedOrdemServico = await this.ordemServicoRepository.save(ordemServico)

    return savedOrdemServico
  }

  async delete(id: number) {
    const deletedOrdemServico = await this.ordemServicoRepository.delete(id)

    return deletedOrdemServico
  }
}
