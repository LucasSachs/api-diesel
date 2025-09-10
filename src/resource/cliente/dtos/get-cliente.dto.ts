import { PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsOptional, IsPositive } from 'class-validator'
import { CreateClienteDto } from './create-cliente.dto'

export class GetClienteDto extends PartialType(CreateClienteDto) {
  @IsOptional()
  @IsPositive({
    message: 'O ID informado é inválido',
  })
  @Type(() => Number)
  id?: number
}
