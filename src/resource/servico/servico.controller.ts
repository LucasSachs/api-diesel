import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { CreateServicoDto } from './dto/create-servico.dto'
import { DeleteServicoDto } from './dto/delete-servico.dto'
import { GetServicoDto } from './dto/get-servico.dto'
import { UpdateServicoDto } from './dto/update-servico.dto'
import { ServicoService } from './servico.service'

@Controller('servico')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Get()
  async getServicos(@Query() servico: GetServicoDto) {
    const servicos = await this.servicoService.find({ where: servico })

    return servicos
  }

  @Post()
  async createNewServico(@Body() newServico: CreateServicoDto) {
    const newCreatedServico = await this.servicoService.save(newServico)

    return newCreatedServico
  }

  @Put()
  async updateServico(@Body() updatedServico: UpdateServicoDto) {
    const newUpdatedServico = await this.servicoService.save(updatedServico)

    return newUpdatedServico
  }

  @Delete()
  async remove(@Body() { id }: DeleteServicoDto) {
    const deletedServico = await this.servicoService.deleteServico(id)

    return deletedServico
  }
}
