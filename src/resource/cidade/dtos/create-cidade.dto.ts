import { Length } from 'class-validator'

export class CreateCidadeDto {
  @Length(3, 255, {
    message: 'A descrição deve ter entre $constraint1 e $constraint2 caracteres',
  })
  descricao: string
}
