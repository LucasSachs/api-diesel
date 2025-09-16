import { Type } from 'class-transformer'
import { Length, ValidateNested } from 'class-validator'
import { CreateEnderecoDto } from 'src/resource/endereco/dtos/create-endereco.dto'

export class CreatePropriedadeDto {
  @Length(11, 11, { message: 'O CADPRO deve ter 11 caracteres' })
  cadpro: string

  // @IsDefined({message: 'O endereço informado é inválido',})
  @Type(() => CreateEnderecoDto)
  @ValidateNested()
  endereco: CreateEnderecoDto
}
