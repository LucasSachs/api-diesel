import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsPositive, ValidateNested } from 'class-validator'
import { Status } from 'src/database/entities/ordem-servico/ordem-servico.entity'
import { CreateOrdemServicoProdutoDto } from 'src/resource/ordem-servico-produto/dto/create-ordem-servico-produto.dto'

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
    message: 'ID de propriedade inválido',
  })
  propriedade_id: number

  @IsArray({ message: 'Os produtos devem ser enviados como uma array' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrdemServicoProdutoDto)
  ordem_servico_produtos: CreateOrdemServicoProdutoDto[]

  @IsArray({ message: 'Os serviços devem ser enviados como uma array' })
  @IsNumber({}, { each: true, message: 'Cada serviço deve ser um número' })
  @ArrayMinSize(1, { message: 'Uma ordem de serviço deve ter pelo menos um serviço' })
  servicos: number[]
}
