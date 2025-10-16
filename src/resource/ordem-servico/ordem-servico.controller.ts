import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common'
import { MoreThan } from 'typeorm'
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto'
import { DeleteOrdemServicoDto } from './dto/delete-ordem-servico.dto'
import { GetOrdemServicoDto } from './dto/get-ordem-servico.dto'
import { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto'
import { OrdemServicoService } from './ordem-servico.service'

@Controller('ordem-servico')
export class OrdemServicoController {
  constructor(
    private readonly ordemServicoService: OrdemServicoService,
  ) {}

  @Get()
  async getOrdensServico(@Query() ordemServico: GetOrdemServicoDto) {
    const ordensServico = await this.ordemServicoService.find({
      where: {
        created_at: ordemServico.date ? MoreThan(ordemServico.date) : undefined,
      },
      relations: [
        'notas',
        'ordem_servico_produtos',
        'ordem_servico_produtos.produto',
        'servicos',
        'propriedade',
        'propriedade.cliente',
        'propriedade.endereco',
        'propriedade.endereco.cidade',
        'propriedade.endereco.uf',
        'usuarios',
      ],
    })

    return ordensServico
  }

  @Get(':id')
  async getOrdemServico(@Param('id') id: string) {
    const ordensServico = await this.ordemServicoService.find({
      where: { id: Number(id) },
      relations: [
        'notas',
        'ordem_servico_produtos',
        'ordem_servico_produtos.produto',
        'servicos',
        'propriedade',
        'propriedade.cliente',
        'propriedade.endereco',
        'propriedade.endereco.cidade',
        'propriedade.endereco.uf',
        'usuarios',
      ],
    })

    return ordensServico
  }

  @Post()
  async createNewOrdemServico(@Body() newOrdemServico: CreateOrdemServicoDto) {
    const createdNewOrdemServico = await this.ordemServicoService.save({
      ...newOrdemServico,
      servicos: newOrdemServico.servicos.map((servico) => { return { id: servico } }),
      usuarios: newOrdemServico.usuarios.map((usuario) => { return { id: usuario } }),
    })

    return createdNewOrdemServico
  }

  @Put()
  async updateOrdemServico(@Body() updatedOrdemServico: UpdateOrdemServicoDto) {
    const newUpdatedOrdemServico = await this.ordemServicoService.save({
      ...updatedOrdemServico,
      servicos: updatedOrdemServico.servicos?.map((servico) => { return { id: servico } }),
      usuarios: updatedOrdemServico.usuarios?.map((usuario) => { return { id: usuario } }),
    })

    return newUpdatedOrdemServico
  }

  @Delete()
  async deleteOrdemServico(@Body() { id }: DeleteOrdemServicoDto) {
    const deletedOrdemServico = await this.ordemServicoService.delete(id)

    const success = Boolean(deletedOrdemServico.affected)
    if (!success) throw new NotFoundException('No Ordem Servico deleted')
  }
}
