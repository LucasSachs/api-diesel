import { IsPositive } from 'class-validator'

export class DeleteServicoDto {
  @IsPositive()
  id: number
}
