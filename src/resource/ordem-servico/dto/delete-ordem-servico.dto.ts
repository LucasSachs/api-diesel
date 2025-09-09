import { IsPositive } from 'class-validator'

export class DeleteOrdemServicoDto {
  @IsPositive()
  id: number
}
