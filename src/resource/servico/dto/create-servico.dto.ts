import { IsOptional, Length } from 'class-validator'

export class CreateServicoDto {
  @Length(3, 255, {
    message: 'O nome deve ter entre $constraint1 e $constraint2 caracteres',
  })
  nome: string

  @IsOptional()
  @Length(3, 512, {
    message: 'A descrição deve ter entre $constraint1 e $constraint2 caracteres',
  })
  descricao: string
}
