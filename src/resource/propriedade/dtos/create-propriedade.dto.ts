import { Type } from 'class-transformer'
import { IsDefined, Length, ValidateNested } from 'class-validator'
import { CreateEnderecoDto } from 'src/resource/endereco/dtos/create-endereco.dto'

export class CreatePropriedadeDto {
  @Length(11, 11)
  cadpro: string

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto
}
