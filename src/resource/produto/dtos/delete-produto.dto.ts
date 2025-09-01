import { IsPositive } from 'class-validator'

export class DeleteProdutoDto {
  @IsPositive()
  id: number
}
