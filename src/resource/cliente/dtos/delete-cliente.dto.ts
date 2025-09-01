import { IsPositive } from 'class-validator'

export class DeleteClienteDto {
  @IsPositive()
  id: number
}
