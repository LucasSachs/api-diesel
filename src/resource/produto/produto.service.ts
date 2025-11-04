import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Produto } from 'src/database/entities/produto/produto.entity'
import { ILike, MoreThanOrEqual, type DeepPartial, type FindManyOptions, type FindOneOptions, type FindOptionsWhere, type Repository } from 'typeorm'

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto) private readonly produtoRepository: Repository<Produto>,
  ) {}

  async findOne(filter: FindOneOptions<Produto>) {
    const produto = await this.produtoRepository.findOne(filter)

    return produto
  }

  async get(filters: FindManyOptions<Produto>) {
    const whereOptions = filters.where as FindOptionsWhere<Produto>

    const produtos = await this.produtoRepository.find({
      ...filters,
      where: {
        ...whereOptions,
        descricao: whereOptions.descricao ? ILike(`%${whereOptions.descricao}%`) : undefined,
        nome: whereOptions.nome ? ILike(`%${whereOptions.nome}%`) : undefined,
        tamanho_tanque: whereOptions.tamanho_tanque ? MoreThanOrEqual(whereOptions.tamanho_tanque) : undefined,
      },
    })

    return produtos
  }

  async save(produto: DeepPartial<Produto>) {
    const savedProduto = await this.produtoRepository.save(produto)

    return savedProduto
  }

  async insert(produtos: DeepPartial<Produto>[]) {
    const savedProdutos = await this.produtoRepository.insert(produtos)

    return savedProdutos
  }

  async delete(id: number) {
    const deletedProduto = await this.produtoRepository.delete(id)

    return deletedProduto
  }
}
