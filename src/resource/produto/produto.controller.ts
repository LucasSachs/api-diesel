import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Post, Put, Query } from '@nestjs/common'
import { CreateProdutoDto } from './dtos/create-produto.dto'
import { DeleteProdutoDto } from './dtos/delete-produto.dto'
import { GetProdutoDto } from './dtos/get-produto.dto'
import { UpdateProdutoDto } from './dtos/update-produto.dto'
import { ProdutoService } from './produto.service'

@Controller('produto')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService,
  ) {}

  @Get()
  async getProdutos(@Query() produto: GetProdutoDto) {
    const produtos = await this.produtoService.get({ where: produto })

    return produtos
  }

  @Post()
  async createNewProduto(@Body() newProduto: CreateProdutoDto) {
    const existingProduto = await this.produtoService.findOne({ where: { nome: newProduto.nome } })
    if (existingProduto) throw new BadRequestException('Já existe um produto cadastrado com esse mesmo nome.')

    const createdNewProduto = await this.produtoService.save(newProduto)

    return createdNewProduto
  }

  @Put()
  async updateProduto(@Body() updatedProduto: UpdateProdutoDto) {
    const newUpdatedProduto = await this.produtoService.save(updatedProduto)

    return newUpdatedProduto
  }

  @Delete()
  async deleteProduto(@Body() { id }: DeleteProdutoDto) {
    const produto = await this.produtoService.findOne({
      where: { id },
      relations: ['ordem_servico_produto'],
    })

    if (!produto) throw new NotFoundException('No produto deleted')
    if (produto.ordem_servico_produto.length > 0) throw new BadRequestException('Esse produto está sendo utilizado em outras ordens de serviço, portanto não pode ser excluído')

    const deletedProduto = await this.produtoService.delete(id)

    const success = Boolean(deletedProduto.affected)
    if (!success) throw new NotFoundException('No produto deleted')
  }
}
