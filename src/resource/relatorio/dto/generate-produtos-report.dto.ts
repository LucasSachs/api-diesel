import { Type } from 'class-transformer'
import { IsPositive } from 'class-validator'

export class generateProdutosReportDto {
  @Type(() => Number)
  @IsPositive()
  days: number
}
