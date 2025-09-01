import { IsOptional, IsPositive, Length } from 'class-validator'

export class CreateProdutoDto {
  @Length(3, 255)
  nome: string

  @IsOptional()
  @Length(3, 512)
  descricao: string

  @IsOptional()
  @IsPositive()
  tamanho_tanque?: number
}
