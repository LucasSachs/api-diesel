import { IsPositive } from 'class-validator'

export class DeleteUserDto {
  @IsPositive({
    message: 'O ID informado é inválido',
  })
  id: number
}
