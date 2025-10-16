import { Type } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class GetOrdemServicoDto {
  @IsOptional()
  @Type(() => Date)
  date?: Date
}
