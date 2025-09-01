import { Body, Controller, Post, Put } from '@nestjs/common'
import { CidadeService } from '../cidade/cidade.service'
import { UfService } from '../uf/uf.service'
import { ClienteService } from './cliente.service'
import { CreateClienteDto } from './dtos/create-cliente.dto'
import type { UpdateClienteDto } from './dtos/update-cliente.dto'

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly cidadeService: CidadeService,
    private readonly ufService: UfService,
  ) {}

  @Post()
  async createNewCliente(@Body() newCliente: CreateClienteDto) {
    const [allCidades, allUfs] = await Promise.all([
      this.cidadeService.find(),
      this.ufService.find(),
    ])

    const newCreatedCliente = await this.clienteService.save({
      ...newCliente,
      propriedades: await Promise.all(
        newCliente.propriedades.map(async (propriedade) => {
          let cidade = allCidades.find(c => c.descricao === propriedade.endereco.cidade.descricao)
          let uf = allUfs.find(u => u.descricao === propriedade.endereco.uf.descricao)

          if (!cidade) cidade = await this.cidadeService.save(propriedade.endereco.cidade)
          if (!uf) uf = await this.ufService.save(propriedade.endereco.uf)

          return {
            ...propriedade,
            endereco: {
              ...propriedade.endereco,
              cidade,
              uf,
            },
          }
        }),
      ),
    })

    return newCreatedCliente
  }

  @Put()
  async updateCliente(@Body() updatedCliente: UpdateClienteDto) {
    console.log(updatedCliente)
  }
}
