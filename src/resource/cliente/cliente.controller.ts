import { Body, Controller, Delete, Get, NotFoundException, Post, Put, Query } from '@nestjs/common'
import type { Endereco } from 'src/database/entities/endereco/endereco.entity'
import type { DeepPartial } from 'typeorm'
import { CidadeService } from '../cidade/cidade.service'
import { UfService } from '../uf/uf.service'
import { ClienteService } from './cliente.service'
import { CreateClienteDto } from './dtos/create-cliente.dto'
import { DeleteClienteDto } from './dtos/delete-cliente.dto'
import { GetClienteDto } from './dtos/get-cliente.dto'
import { UpdateClienteDto } from './dtos/update-cliente.dto'

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly cidadeService: CidadeService,
    private readonly ufService: UfService,
  ) {}

  @Get()
  async getClientes(@Query() cliente: GetClienteDto) {
    const clientes = await this.clienteService.find({
      where: cliente,
      relations: [
        'emails',
        'telefones',
        'propriedades',
        'propriedades.endereco',
        'propriedades.endereco.cidade',
        'propriedades.endereco.uf',
      ],
    })

    return clientes
  }

  @Post()
  async createNewCliente(@Body() newCliente: CreateClienteDto) {
    const [allCidades, allUfs] = await Promise.all([
      this.cidadeService.find(),
      this.ufService.find(),
    ])

    const newCreatedCliente = await this.clienteService.save({
      ...newCliente,
      propriedades: newCliente.propriedades
        ? await Promise.all(
            newCliente.propriedades.map(async (propriedade) => {
              const updatedEndereco: DeepPartial<Endereco> = propriedade.endereco ? { ...propriedade.endereco } : {}

              if (propriedade.endereco?.cidade) {
                let cidade = allCidades.find(c => c.descricao === propriedade.endereco!.cidade.descricao)
                if (!cidade) cidade = await this.cidadeService.save({ descricao: propriedade.endereco.cidade.descricao })
                updatedEndereco.cidade = cidade
              }

              if (propriedade.endereco?.uf) {
                let uf = allUfs.find(u => u.descricao === propriedade.endereco!.uf.descricao)
                if (!uf) uf = await this.ufService.save({ descricao: propriedade.endereco.uf.descricao })
                updatedEndereco.uf = uf
              }

              return {
                ...propriedade,
                endereco: updatedEndereco,
              }
            }),
          )
        : [],
    })

    return newCreatedCliente
  }

  @Put()
  async updateCliente(@Body() updatedCliente: UpdateClienteDto) {
    const [allCidades, allUfs] = await Promise.all([
      this.cidadeService.find(),
      this.ufService.find(),
    ])

    console.log(updatedCliente)

    const newUpdatedCliente = await this.clienteService.save({
      ...updatedCliente,
      propriedades: updatedCliente.propriedades
        ? await Promise.all(
            updatedCliente.propriedades.map(async (propriedade) => {
              const updatedEndereco: DeepPartial<Endereco> = propriedade.endereco ? { ...propriedade.endereco } : {}

              if (propriedade.endereco?.cidade) {
                let cidade = allCidades.find(c => c.descricao === propriedade.endereco!.cidade.descricao)
                if (!cidade) cidade = await this.cidadeService.save({ descricao: propriedade.endereco.cidade.descricao })
                updatedEndereco.cidade = cidade
              }

              if (propriedade.endereco?.uf) {
                let uf = allUfs.find(u => u.descricao === propriedade.endereco!.uf.descricao)
                if (!uf) uf = await this.ufService.save({ descricao: propriedade.endereco.uf.descricao })
                updatedEndereco.uf = uf
              }

              return {
                ...propriedade,
                endereco: updatedEndereco,
              }
            }),
          )
        : [],
    })

    return newUpdatedCliente
  }

  @Delete()
  async deleteCliente(@Body() { id }: DeleteClienteDto) {
    const deletedCliente = await this.clienteService.delete(id)

    const success = Boolean(deletedCliente.affected)
    if (!success) throw new NotFoundException('No cliente deleted')
  }
}
