import { IsPositive } from 'class-validator'

export class DeleteClienteDto {
  @IsPositive({
    message: 'O ID informado é inválido',
  })
  id: number
}
