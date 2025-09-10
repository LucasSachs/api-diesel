import { IsOptional, IsPositive, Length } from 'class-validator'

export class CreateProdutoDto {
  @Length(3, 255, {
    message: 'O nome deve ter entre $constraint1 e $constraint2 caracteres',
  })
  nome: string

  @IsOptional()
  @Length(3, 512, {
    message: 'A descrição deve ter entre $constraint1 e $constraint2 caracteres',
  })
  descricao: string

  @IsOptional()
  @IsPositive({
    message: 'O tamanho do tanque informado é inválido',
  })
  tamanho_tanque?: number

  @IsPositive({
    message: 'Valor do produto inválido',
  })
  valor: number
}
