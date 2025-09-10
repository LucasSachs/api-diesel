import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, Length, ValidateNested } from 'class-validator'
import { CreateClienteEmail } from 'src/resource/cliente-email/dtos/create-cliente-email.dto'
import { CreateTelefoneDto } from 'src/resource/cliente-telefone/dtos/create-cliente-telefone.dto'
import { CreatePropriedadeDto } from 'src/resource/propriedade/dtos/create-propriedade.dto'

export class CreateClienteDto {
  @Length(3, 255, {
    message: 'O nome deve ter entre $constraint1 e $constraint2 caracteres',
  })
  nome: string

  @Length(11, 14, {
    message: 'O CPF/CNPJ deve ter entre $constraint1 e $constraint2 caracteres',
  })
  cpf_cnpj: string

  @IsArray({
    message: 'As propriedades informadas são inválidas',
  })
  @ArrayMinSize(1, {
    message: 'O cliente deve ter no mínimo $constraint1 propriedade',
  })
  @ValidateNested({ each: true })
  @Type(() => CreatePropriedadeDto)
  propriedades: CreatePropriedadeDto[]

  @IsArray({
    message: 'Os e-mails informados são inválidos',
  })
  @ArrayMinSize(1, {
    message: 'O cliente deve ter no mínimo $constraint1 e-mail',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateClienteEmail)
  emails: CreateClienteEmail[]

  @IsArray({
    message: 'Os telefones informados são inválidos',
  })
  @ArrayMinSize(1, {
    message: 'O cliente deve ter no mínimo $constraint1 telefone',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateTelefoneDto)
  telefones: CreateTelefoneDto[]
}
