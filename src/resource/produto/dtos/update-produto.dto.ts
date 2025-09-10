import { PartialType } from '@nestjs/mapped-types'
import { IsPositive } from 'class-validator'
import { CreateProdutoDto } from './create-produto.dto'

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
  @IsPositive({
    message: 'O ID informado é inválido',
  })
  id: number
}
