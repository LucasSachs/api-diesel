import { PartialType } from '@nestjs/mapped-types'
import { IsISO8601, IsOptional, IsPositive } from 'class-validator'
import { CreateOrdemServicoDto } from './create-ordem-servico.dto'

export class UpdateOrdemServicoDto extends PartialType(CreateOrdemServicoDto) {
  @IsPositive()
  id: number

  @IsOptional()
  @IsISO8601()
  dt_concluida: Date
}
