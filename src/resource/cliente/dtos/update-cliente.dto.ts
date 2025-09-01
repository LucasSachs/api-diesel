import { OmitType, PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsArray, IsPositive, ValidateNested } from 'class-validator'
import { UpdatePropriedadeDto } from 'src/resource/propriedade/dtos/update-propriedade.dto'
import { CreateClienteDto } from './create-cliente.dto'

export class UpdateClienteDto extends PartialType(OmitType(CreateClienteDto, ['propriedades'] as const)) {
  @IsPositive()
  id: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePropriedadeDto)
  propriedades: UpdatePropriedadeDto[]
}
