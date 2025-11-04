import { Type } from 'class-transformer'
import { IsPositive } from 'class-validator'

export class GenerateFinancialReportDto {
  @Type(() => Number)
  @IsPositive()
  days: number
}
