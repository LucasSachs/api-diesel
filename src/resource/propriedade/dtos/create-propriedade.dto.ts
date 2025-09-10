import { Type } from 'class-transformer'
import { IsDefined, Length, ValidateNested } from 'class-validator'
import { CreateEnderecoDto } from 'src/resource/endereco/dtos/create-endereco.dto'

export class CreatePropriedadeDto {
  @Length(11, 11, {
    message: 'O CADPRO deve ter $constraint1 caracteres',
  })
  cadpro: string

  @IsDefined({
    message: 'O endereço informado é inválido',
  })
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto
}
