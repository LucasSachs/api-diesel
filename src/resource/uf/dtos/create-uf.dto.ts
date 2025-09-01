import { Length } from 'class-validator'

export class CreateUfDto {
  @Length(3, 255)
  descricao: string
}
