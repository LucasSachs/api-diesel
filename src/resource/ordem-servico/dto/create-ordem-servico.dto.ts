import { IsEnum, IsPositive } from 'class-validator'
import { Status } from 'src/database/entities/ordem-servico/ordem-servico.entity'

export class CreateOrdemServicoDto {
  @IsEnum(Status)
  status: Status

  @IsPositive({
    message: 'Valor de deslocamento inválido',
  })
  valor_deslocamento: number

  @IsPositive({
    message: 'Valor de mão de obra inválido',
  })
  valor_mo: number

  @IsPositive({
    message: 'Valor de produtos inválido',
  })
  valor_produtos: number

  @IsPositive({
    message: 'ID de propriedade inválido',
  })
  propriedade_id: number

  // TODO > Add products
}
