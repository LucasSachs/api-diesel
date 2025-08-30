import { IsOptional, IsPositive, Length } from 'class-validator'
import type { Produto } from 'src/database/entities/produto/produto.entity'

export class CreateProdutoDto implements Partial<Produto> {
  @Length(3, 255)
  nome: string

  @IsOptional()
  @Length(3, 512)
  descricao: string

  @IsOptional()
  @IsPositive()
  tamanho_tanque?: number
}
