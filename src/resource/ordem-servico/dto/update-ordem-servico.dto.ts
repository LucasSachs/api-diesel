import { PartialType } from '@nestjs/mapped-types'
import { IsPositive } from 'class-validator'
import { CreateOrdemServicoDto } from './create-ordem-servico.dto'

export class UpdateOrdemServicoDto extends PartialType(CreateOrdemServicoDto) {
  @IsPositive()
  id: number
}
