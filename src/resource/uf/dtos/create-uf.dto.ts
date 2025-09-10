import { Length } from 'class-validator'

export class CreateUfDto {
  @Length(2, 2, {
    message: 'A UF deve ter $constraint1 caracteres',
  })
  descricao: string
}
