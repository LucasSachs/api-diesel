import { IsOptional, Length } from 'class-validator'

export class CreateServicoDto {
  @Length(3, 255)
  nome: string

  @IsOptional()
  @Length(3, 512)
  descricao: string
}
