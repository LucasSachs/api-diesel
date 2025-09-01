import { Length } from 'class-validator'

export class CreateCidadeDto {
  @Length(3, 255)
  descricao: string
}
