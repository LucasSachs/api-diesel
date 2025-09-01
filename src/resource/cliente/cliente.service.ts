import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cliente } from 'src/database/entities/cliente/cliente.entity'
import type { DeepPartial, Repository } from 'typeorm'

@Injectable()
export class ClienteService {
  constructor(
        @InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async save(cliente: DeepPartial<Cliente>) {
    const savedCliente = await this.clienteRepository.save(cliente)

    return savedCliente
  }
}
