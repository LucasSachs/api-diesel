import { Length } from 'class-validator'

export class CreateTelefoneDto {
  @Length(11, 11)
  descricao: string
}
