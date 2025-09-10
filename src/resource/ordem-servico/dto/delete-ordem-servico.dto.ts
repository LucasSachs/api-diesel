import { IsPositive } from 'class-validator'

export class DeleteOrdemServicoDto {
  @IsPositive({
    message: 'O ID informado é inválido',
  })
  id: number
}
