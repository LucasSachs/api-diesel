import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cliente } from 'src/database/entities/cliente/cliente.entity'
import type { DeepPartial, FindManyOptions, Repository } from 'typeorm'

@Injectable()
export class ClienteService {
  constructor(
        @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async find(filters?: FindManyOptions<Cliente>) {
    const clientes = await this.clienteRepository.find(filters)

    return clientes
  }

  async save(cliente: DeepPartial<Cliente>) {
    const savedCliente = await this.clienteRepository.save(cliente)

    return savedCliente
  }

  async delete(id: number) {
    const deletedCliente = await this.clienteRepository.delete(id)

    return deletedCliente
  }
}
