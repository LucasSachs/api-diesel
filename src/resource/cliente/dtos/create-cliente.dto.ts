import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, Length, ValidateNested } from 'class-validator'
import { CreateClienteEmail } from 'src/resource/cliente-email/dtos/create-cliente-email.dto'
import { CreateTelefoneDto } from 'src/resource/cliente-telefone/dtos/create-cliente-telefone.dto'
import { CreatePropriedadeDto } from 'src/resource/propriedade/dtos/create-propriedade.dto'

export class CreateClienteDto {
  @Length(3, 255)
  nome: string

  @Length(11, 14)
  cpf_cnpj: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePropriedadeDto)
  propriedades: CreatePropriedadeDto[]

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateClienteEmail)
  emails: CreateClienteEmail[]

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTelefoneDto)
  telefones: CreateTelefoneDto[]
}
