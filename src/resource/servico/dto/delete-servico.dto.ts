import { IsPositive } from 'class-validator'

export class DeleteServicoDto {
  @IsPositive({
    message: 'O ID informado é inválido',
  })
  id: number
}
