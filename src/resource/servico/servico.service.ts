import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Servico } from 'src/database/entities/servico/servico.entity'
import { ILike, type DeepPartial, type FindManyOptions, type FindOptionsWhere, type Repository } from 'typeorm'

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(Servico) private readonly servicoRepository: Repository<Servico>,
  ) {}

  async find(filters: FindManyOptions<Servico>) {
    const whereOptions = filters.where as FindOptionsWhere<Servico>

    const servico = this.servicoRepository.find({
      ...filters,
      where: {
        ...whereOptions,
        nome: whereOptions.nome ? ILike(`%${whereOptions.nome}%`) : undefined,
        descricao: whereOptions.descricao ? ILike(`%${whereOptions.descricao}%`) : undefined,
      },
    })

    return servico
  }

  async save(servico: DeepPartial<Servico>) {
    const savedServico = this.servicoRepository.save(servico)

    return savedServico
  }

  async deleteServico(id: number) {
    const deletedServico = await this.servicoRepository.delete(id)

    const success = Boolean(deletedServico.affected)
    if (!success) throw new NotFoundException('No servico deleted')
  }
}
