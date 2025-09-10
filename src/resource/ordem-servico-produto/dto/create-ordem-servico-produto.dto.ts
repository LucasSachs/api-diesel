import { IsPositive } from 'class-validator'

export class CreateOrdemServicoProdutoDto {
  @IsPositive({
    message: 'ID de produto inválido',
  })
  produto_id: number

  @IsPositive({
    message: 'Quantidade inválida',
  })
  quantidade: number

  @IsPositive({
    message: 'Valor do produto inválido',
  })
  valor: number
}
