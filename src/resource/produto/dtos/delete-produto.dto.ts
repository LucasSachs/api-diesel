import { IsPositive } from 'class-validator'

export class DeleteProdutoDto {
  @IsPositive({
    message: 'O ID informado é inválido',
  })
  id: number
}
