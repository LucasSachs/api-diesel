import { PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsOptional, IsPositive } from 'class-validator'
import { CreateProdutoDto } from './create-produto.dto'

export class GetProdutoDto extends PartialType(CreateProdutoDto) {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  id?: number

  @Type(() => Number)
  tamanho_tanque?: CreateProdutoDto['tamanho_tanque']
}
