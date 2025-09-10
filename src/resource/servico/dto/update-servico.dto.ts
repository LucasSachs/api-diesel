import { PartialType } from '@nestjs/mapped-types'
import { IsPositive } from 'class-validator'
import { CreateServicoDto } from './create-servico.dto'

export class UpdateServicoDto extends PartialType(CreateServicoDto) {
  @IsPositive({
    message: 'O ID informado é inválido',
  })
  id: number
}
