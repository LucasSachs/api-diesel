import { PartialType } from '@nestjs/mapped-types'
import { IsPositive } from 'class-validator'
import { CreateEnderecoDto } from './create-endereco.dto'

export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {
  @IsPositive()
  id: number
}
