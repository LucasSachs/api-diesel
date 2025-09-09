import { Body, Controller, Delete, Get, NotFoundException, Post, Put, Query } from '@nestjs/common'
import type { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto'
import type { DeleteOrdemServicoDto } from './dto/delete-ordem-servico.dto'
import type { GetOrdemServicoDto } from './dto/get-ordem-servico.dto'
import type { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto'
import { OrdemServicoService } from './ordem-servico.service'

@Controller('ordem-servico')
export class OrdemServicoController {
  constructor(
    private readonly ordemServicoService: OrdemServicoService,
  ) {}

  @Get()
  async getOrdensServico(@Query() ordemServico: GetOrdemServicoDto) {
    const ordensServico = await this.ordemServicoService.find({ where: ordemServico })

    return ordensServico
  }

  @Post()
  async createNewOrdemServico(@Body() newOrdemServico: CreateOrdemServicoDto) {
    const createdNewOrdemServico = await this.ordemServicoService.save(newOrdemServico)

    return createdNewOrdemServico
  }

  @Put()
  async updateOrdemServico(@Body() updatedOrdemServico: UpdateOrdemServicoDto) {
    const newUpdatedOrdemServico = await this.ordemServicoService.save(updatedOrdemServico)

    return newUpdatedOrdemServico
  }

  @Delete()
  async deleteOrdemServico(@Body() { id }: DeleteOrdemServicoDto) {
    const deletedOrdemServico = await this.ordemServicoService.delete(id)

    const success = Boolean(deletedOrdemServico.affected)
    if (!success) throw new NotFoundException('No Ordem Servico deleted')
  }
}
