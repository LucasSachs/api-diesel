import { PartialType } from '@nestjs/mapped-types'
import { IsPositive } from 'class-validator'
import { CreatePropriedadeDto } from './create-propriedade.dto'

export class UpdatePropriedadeDto extends PartialType(CreatePropriedadeDto) {
  @IsPositive()
  id: number
}
