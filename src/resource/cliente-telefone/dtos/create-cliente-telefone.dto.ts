import { Length } from 'class-validator'

export class CreateTelefoneDto {
  @Length(11, 11, {
    message: 'O telefone deve ter $constraint1 caracteres',
  })
  descricao: string
}
