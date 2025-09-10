import { Type } from 'class-transformer'
import { IsDefined, IsNumber, IsOptional, IsPositive, Length, ValidateNested } from 'class-validator'
import { CreateCidadeDto } from 'src/resource/cidade/dtos/create-cidade.dto'
import { CreateUfDto } from 'src/resource/uf/dtos/create-uf.dto'

export class CreateEnderecoDto {
  @Length(8, 8, {
    message: 'O CEP deve ter $constraint1 caracteres',
  })
  cep: string

  @IsOptional()
  @Length(3, 255, {
    message: 'O complemento deve ter entre $constraint1 e $constraint2 caracteres',
  })
  complemento: string

  @IsNumber(
    {},
    {
      message: 'A latitude informada é inválida',
    },
  )
  lat: number

  @IsNumber(
    {},
    {
      message: 'A longitude informada é inválida',
    },
  )
  long: number

  @IsOptional()
  @IsPositive({
    message: 'O número informado é inválido',
  })
  numero: number

  @IsDefined({
    message: 'A cidade informada é inválida',
  })
  @ValidateNested()
  @Type(() => CreateCidadeDto)
  cidade: CreateCidadeDto

  @IsDefined({
    message: 'A UF informada é inválida',
  })
  @ValidateNested()
  @Type(() => CreateUfDto)
  uf: CreateUfDto
}
