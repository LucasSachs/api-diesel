import { PartialType } from '@nestjs/mapped-types'
import { IsPositive } from 'class-validator'
import { CreateClienteDto } from './create-cliente.dto'

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsPositive()
  id: number
}
