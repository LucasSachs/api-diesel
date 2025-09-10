import { IsEmail, IsEnum, IsISO8601, Length } from 'class-validator'
import { Cargo, Status } from 'src/database/entities/usuario/usuario.entity'

export class CreateUserDto {
  @IsEnum(Cargo, {
    message: 'O cargo informado é inválido',
  })
  cargo: Cargo

  @IsEmail(
    {},
    {
      message: 'O e-mail informado é inválido',
    },
  )
  email: string

  @Length(3, 255, {
    message: 'O nome deve ter entre $constraint1 e $constraint2 caracteres',
  })
  nome: string

  @Length(9, 9, {
    message: 'O RG deve ter $constraint1 caracteres',
  })
  rg: string

  @IsISO8601(
    {},
    {
      message: 'A data de nascimento informada é inválida',
    },
  )
  data_nascimento: Date

  @Length(11, 11, {
    message: 'O CPF deve ter $constraint1 caracteres',
  })
  cpf: string

  @IsEnum(Status, {
    message: 'O status informado é inválido',
  })
  status: Status
}
